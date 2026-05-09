const __rtcpl_r__ = [], __rtcpl_aot_fns__ = [], __rtcpl_setup_aot__ = (f) => {
	__rtcpl_aot_fns__.push(f);
};
let __rtcpl_aot_fn_idx__ = 0;
__rtcpl_setup_aot__(($) => () => console.log("Hi")), __rtcpl_aot_fns__[__rtcpl_aot_fn_idx__++](__rtcpl_r__)();
//#endregion
