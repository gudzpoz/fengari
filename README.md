# fengari
🐺 φεγγάρι - A Lua VM written in JS ES6 targeting the browser

## So far

- [x] Parse bytecode
- [x] Opcodes
- [ ] Basic types representation:
    - [x] nil
    - [x] boolean
    - [x] table
    - [x] function
    - [ ] string (8-bit clean)
    - [ ] number (32-bit ?)
        - [ ] integer
        - [ ] float
    - [ ] userdata
    - [ ] thread
- [ ] Tag Methods
    - [x] ...
    - [ ] `__tostring`
    - [ ] `__pairs`
- [ ] C API
    - [x] lua_absindex
    - [x] lua_atpanic
    - [x] lua_call
    - [x] lua_callk
    - [x] lua_checkstack
    - [x] lua_concat
    - [x] lua_copy
    - [x] lua_createtable
    - [x] lua_error
    - [x] lua_getfield
    - [x] lua_getglobal
    - [x] lua_getmetatable
    - [x] lua_gettable
    - [x] lua_gettop
    - [x] lua_insert
    - [x] lua_isstring
    - [x] lua_istable
    - [x] lua_isyieldable
    - [x] lua_load
    - [x] lua_newstate
    - [x] lua_newtable
    - [x] lua_newthread
    - [x] lua_next
    - [x] lua_pcall
    - [x] lua_pop
    - [x] lua_pushboolean
    - [x] lua_pushglobaltable
    - [x] lua_pushinteger
    - [x] lua_pushjsclosure (lua_pushcclosure)
    - [x] lua_pushjsfunction (lua_pushcfunction)
    - [x] lua_pushliteral
    - [x] lua_pushlstring
    - [x] lua_pushnil
    - [x] lua_pushnumber
    - [x] lua_pushstring
    - [x] lua_pushvalue
    - [x] lua_rawequal
    - [x] lua_rawget
    - [x] lua_rawgeti
    - [x] lua_rawlen
    - [x] lua_rawset
    - [x] lua_remove
    - [x] lua_resume
    - [x] lua_rotate
    - [x] lua_setfield
    - [x] lua_setglobal
    - [x] lua_setmetatable
    - [x] lua_settable
    - [x] lua_settop
    - [x] lua_status
    - [x] lua_stringtonumber
    - [x] lua_toboolean
    - [x] lua_tointeger
    - [x] lua_tointegerx
    - [x] lua_tolstring
    - [x] lua_tonumber
    - [x] lua_tonumberx
    - [x] lua_topointer
    - [x] lua_tostring
    - [x] lua_tothread
    - [x] lua_type
    - [x] lua_typename
    - [x] lua_upvalueindex
    - [x] lua_version
    - [x] lua_xmove
    - [x] lua_yield
    - [x] lua_yieldk
    - [ ] lua_arith
    - [ ] lua_close
    - [ ] lua_compare
    - [ ] lua_dump
    - [x] lua_gc (unavailable)
    - [x] lua_getallocf (unavailable)
    - [x] lua_getextraspace (unavailable)
    - [ ] lua_gethook
    - [ ] lua_gethookcount
    - [ ] lua_gethookmask
    - [ ] lua_geti
    - [ ] lua_getinfo
    - [ ] lua_getlocal
    - [ ] lua_getstack
    - [ ] lua_getupvalue
    - [ ] lua_getuservalue
    - [ ] lua_isboolean
    - [ ] lua_iscfunction
    - [ ] lua_isfunction
    - [ ] lua_isinteger
    - [ ] lua_islightuserdata
    - [ ] lua_isnil
    - [ ] lua_isnone
    - [ ] lua_isnoneornil
    - [ ] lua_isnumber
    - [ ] lua_isthread
    - [ ] lua_isuserdata
    - [ ] lua_len
    - [ ] lua_newuserdata
    - [ ] lua_numbertointeger
    - [ ] lua_pcallk
    - [ ] lua_pushfstring
    - [ ] lua_pushlightuserdata
    - [ ] lua_pushthread
    - [ ] lua_pushvfstring
    - [ ] lua_rawgetp
    - [ ] lua_rawseti
    - [ ] lua_rawsetp
    - [ ] lua_register
    - [ ] lua_replace
    - [ ] lua_setallocf
    - [ ] lua_sethook
    - [ ] lua_seti
    - [ ] lua_setlocal
    - [ ] lua_setupvalue
    - [ ] lua_setuservalue
    - [ ] lua_tocfunction
    - [ ] lua_touserdata
    - [ ] lua_upvalueid
    - [ ] lua_upvaluejoin
- [ ] Auxiliary library
    - [x] luaL_argcheck
    - [x] luaL_argerror
    - [x] luaL_callmeta
    - [x] luaL_checkany
    - [x] luaL_checkinteger
    - [x] luaL_checklstring
    - [x] luaL_checkstack
    - [x] luaL_checktype
    - [x] luaL_error
    - [x] luaL_getmetafield
    - [x] luaL_getsubtable
    - [x] luaL_newlib
    - [x] luaL_newstate
    - [x] luaL_openlibs
    - [x] luaL_opt
    - [x] luaL_optinteger
    - [x] luaL_optlstring
    - [x] luaL_requiref
    - [x] luaL_setfuncs
    - [x] luaL_tolstring
    - [x] luaL_typename
    - [x] luaL_where
    - [ ] luaL_addchar
    - [ ] luaL_addlstring
    - [ ] luaL_addsize
    - [ ] luaL_addstring
    - [ ] luaL_addvalue
    - [ ] luaL_buffinit
    - [ ] luaL_buffinitsize
    - [ ] luaL_checknumber
    - [ ] luaL_checkoption
    - [ ] luaL_checkstring
    - [ ] luaL_checkudata
    - [ ] luaL_checkversion
    - [ ] luaL_dofile
    - [ ] luaL_dostring
    - [ ] luaL_execresult
    - [ ] luaL_fileresult
    - [ ] luaL_getmetatable
    - [ ] luaL_gsub
    - [ ] luaL_len
    - [ ] luaL_loadbuffer
    - [ ] luaL_loadbufferx
    - [ ] luaL_loadfile
    - [ ] luaL_loadfilex
    - [ ] luaL_loadstring
    - [ ] luaL_newlibtable
    - [ ] luaL_newmetatable
    - [ ] luaL_optnumber
    - [ ] luaL_optstring
    - [ ] luaL_prepbuffer
    - [ ] luaL_prepbuffsize
    - [ ] luaL_pushresult
    - [ ] luaL_pushresultsize
    - [ ] luaL_ref
    - [ ] luaL_setmetatable
    - [ ] luaL_testudata
    - [ ] luaL_traceback
    - [ ] luaL_unref
- [ ] Standard library
    - [ ] Base lib
        - [x] assert
        - [x] collectgarbage (unavailable)
        - [x] error
        - [x] getmetatable
        - [x] ipairs
        - [x] next
        - [x] pairs
        - [x] pcall
        - [x] print
        - [x] rawequal
        - [x] rawget
        - [x] rawlen
        - [x] rawset
        - [x] select
        - [x] setmetatable
        - [x] tonumber
        - [x] tostring
        - [x] type
        - [x] xpcall
        - [ ] dofile
        - [ ] loadfile
        - [ ] load
    - [ ] Coroutine
        - [x] coroutine.create
        - [x] coroutine.resume
        - [x] coroutine.yield
        - [ ] coroutine.isyieldable
        - [ ] coroutine.running
        - [ ] coroutine.status
        - [ ] coroutine.wrap
- [ ] Debug (errors)
- [ ] DOM API binding
- [ ] Parse Lua
- [ ] Generate bytecode

## References

- [Source code for Lua 5.3](lua.org/source/5.3/)
- [Lua 5.2 Bytecode and Virtual Machine](http://files.catwell.info/misc/mirror/lua-5.2-bytecode-vm-dirk-laurie/lua52vm.html)
- [Lua 5.3 Bytecode Reference](http://the-ravi-programming-language.readthedocs.io/en/latest/lua_bytecode_reference.html)
- [A No-Frills Introduction to Lua 5.1 VM Instructions](http://luaforge.net/docman/83/98/ANoFrillsIntroToLua51VMInstructions.pdf)