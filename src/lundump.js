/*jshint esversion: 6 */
"use strict";

const DataView      = require('buffer-dataview');
const fs            = require('fs');
const assert        = require('assert');

const lua_State     = require('./lstate.js').lua_State;
const LClosure      = require('./lobject.js').LClosure;
const Proto         = require('./lfunc.js').Proto;
const constant_types = require('./lua.js').constant_types;

const LUAI_MAXSHORTLEN = 40;

/**
 * Parse Lua 5.3 bytecode
 * @see {@link http://www.lua.org/source/5.3/lundump.c.html|lundump.c}
 */
class BytecodeParser {

    /**
     * Initilialize bytecode parser
     * @constructor
     * @param {lua_State} Lua state object
     * @param {DataView} dataView Contains the binary data
     */
    constructor(L, dataView) {
        this.intSize = 4;
        this.size_tSize = 8;
        this.instructionSize = 4;
        this.integerSize = 8;
        this.numberSize = 8;

        this.L = L;
        this.dataView = dataView;
        this.offset = 0;
    }

    peekByte() {
        return this.dataView.getUint8(this.offset, true);
    }

    readByte() {
        let byte = this.peekByte();
        this.offset++;
        return byte;
    }

    peekInteger() {
        return this.dataView.getInt32(this.offset, true);
    }

    readInteger() {
        let integer = this.peekInteger();
        this.offset += this.integerSize;

        return integer;
    }

    peekInt() {
        return this.dataView.getInt32(this.offset, true);
    }

    readInt() {
        let integer = this.peekInt();
        this.offset += 4;

        return integer;
    }

    peekNumber() {
        return this.dataView.getFloat64(this.offset, true);
    }

    readNumber() {
        let number = this.peekNumber();
        this.offset += this.numberSize;

        return number;
    }

    readString(n) {
        let size = typeof n !== 'undefined' ? n : this.readByte() - 1;

        if (size === 0xFF) // TODO test
            this.offset += this.size_tSize;

        if (size === 0) {
            return null;
        }

        let string = "";

        for (let i = 0; i < size; i++)
            string += String.fromCharCode(this.readByte());

        return string;
    }

    readInstruction() {
        let ins = new DataView(new Buffer(this.instructionSize))
        for (let i = 0; i < this.instructionSize; i++)
            ins.setUint8(i, this.readByte());

        console.log(ins);

        return ins;
    }

    readCode(f) {
        let n = this.readInt();

        for (let i = 0; i < n; i++)
            f.code.push(this.readInstruction());
    }

    readUpvalues(f) {
        let n = this.readInt();

        for (let i = 0; i < n; i++) {
            f.upvalues[i] = {
                name:    null,
                instack: this.readByte(),
                idx:     this.readByte()
            };

            console.log(`
                f.upvalues[${i}].name    = ${f.upvalues[i].name}
                f.upvalues[${i}].instack = ${f.upvalues[i].instack}
                f.upvalues[${i}].idx     = ${f.upvalues[i].idx}
            `);
        }
    }

    readConstants(f) {
        let n = this.readInt();
        
        for (let i = 0; i < n; i++) {
            let t = this.readByte();

            switch (t) {
            case constant_types.LUA_TNIL:
                f.k.push({
                    type: constant_types.LUA_TNIL,
                    value: null
                });
                console.log(`LUA_TNIL     = ${f.k[f.k.length - 1].value}`);
                break;
            case constant_types.LUA_TBOOLEAN:
                f.k.push({
                    type: constant_types.LUA_TBOOLEAN,
                    value: this.readByte()
                });
                console.log(`LUA_TBOOLEAN = ${f.k[f.k.length - 1].value}`);
                break;
            case constant_types.LUA_TNUMFLT:
                f.k.push({
                    type: constant_types.LUA_TNUMFLT,
                    value: this.readNumber()
                });
                console.log(`LUA_TNUMFLT  = ${f.k[f.k.length - 1].value}`);
                break;
            case constant_types.LUA_TNUMINT:
                f.k.push({
                    type: constant_types.LUA_TNUMINT,
                    value: this.readInteger()
                });
                console.log(`LUA_TNUMINT  = ${f.k[f.k.length - 1].value}`);
                break;
            case constant_types.LUA_TSHRSTR:
            case constant_types.LUA_TLNGSTR:
                f.k.push({
                    type: constant_types.LUA_TLNGSTR,
                    value: this.readString()
                });
                console.log(`LUA_TLNGSTR  = ${f.k[f.k.length - 1].value}`);
                break;
            default:
                throw new Error(`unrecognized constant '${t}'`);
            }
        }
    }

    readProtos(f) {
        let n = this.readInt();

        for (let i = 0; i < n; i++) {
            f.p[i] = new Proto(this.L);
            this.readFunction(f.p[i], f.source);
        }
    }

    readDebug(f) {
        let n = this.readInt();
        for (let i = 0; i < n; i++)
            f.lineinfo[i] = this.readInt();

        n = this.readInt();
        for (let i = 0; i < n; i++) {
            f.locvars[i] = {
                varname: this.readString(),
                startpc: this.readInt(),
                endpc:   this.readInt()
            }

            console.log(`
                f.locvars[${i}].varname = ${f.locvars[i].varname}
                f.locvars[${i}].startpc = ${f.locvars[i].startpc}
                f.locvars[${i}].endpc   = ${f.locvars[i].endpc}
            `);
        }

        n = this.readInt();
        for (let i = 0; i < n; i++) {
            f.upvalues[i].name = this.readString();

            console.log(`
                f.upvalues[${i}].name = ${f.upvalues[i].name}
            `);
        }
    }

    readFunction(f, psource) {
        f.source = this.readString();
        if (f.source === null || f.source === undefined || f.source.length === 0)  /* no source in dump? */
            f.source = psource;  /* reuse parent's source */
        f.linedefined = this.readInt();
        f.lastlinedefined = this.readInt();
        f.numparams = this.readByte();
        f.is_vararg = this.readByte();
        f.maxstacksize = this.readByte();

        console.log(`
            f.source          = ${f.source}
            f.linedefined     = ${f.linedefined}
            f.lastlinedefined = ${f.lastlinedefined}
            f.numparams       = ${f.numparams}
            f.is_vararg       = ${f.is_vararg}
            f.maxstacksize    = ${f.maxstacksize}
        `);

        this.readCode(f);
        this.readConstants(f);
        this.readUpvalues(f);
        this.readProtos(f);
        this.readDebug(f);
    }

    checkHeader() {
        if (this.readString(4) !== "\x1bLua")
            throw new Error("bad LUA_SIGNATURE, expected '<esc>Lua'");

        if (this.readByte() !== 0x53)
            throw new Error("bad Lua version, expected 5.3");

        if (this.readByte() !== 0)
            throw new Error("supports only official PUC-Rio implementation");

        if (this.readString(6) !== "\x19\x93\r\n\x1a\n")
            throw new Error("bytecode corrupted");

        this.intSize         = this.readByte();
        this.size_tSize      = this.readByte();
        this.instructionSize = this.readByte();
        this.integerSize     = this.readByte();
        this.numberSize      = this.readByte();

        console.log(`
            intSize         = ${this.intSize}
            size_tSize      = ${this.size_tSize}
            instructionSize = ${this.instructionSize}
            integerSize     = ${this.integerSize}
            numberSize      = ${this.numberSize}
        `)

        if (this.readInteger() !== 0x5678)
            throw new Error("endianness mismatch");

        if (this.readNumber() !== 370.5)
            throw new Error("float format mismatch");

    }

    luaU_undump() {
        this.checkHeader();

        let cl = new LClosure(this.L, this.readByte());
        this.L.top++;
        cl.p = new Proto(this.L);

        this.readFunction(cl.p);

        assert(cl.nupvalues === cl.p.upvalues.length);

        return cl;
    }

}

module.exports = BytecodeParser;