export enum AuthMessage {
    NotFoundAccount = "حساب کاربری یافت نشد",
    TryAgain = "دوباره تلاش کنید",
    AlreadyExistAccount = "حساب کاربری با این مشخصات قبلا وجود دارد",
    ExpiredCode="کد تایید منقصی شده مجددا تلاش کنید.",
    LoginAgain="مجددا وارد حساب کاربری خود شوید",
    LoginIsRequired="وارد حساب کاربری خود شوید",
    NotExpiredOtp='کد تایید هنوز منقضی نشده است!'
}

export enum PublicMessage {
    SentOtp = "کد یکبار مصرف با موفقیت ارسال شد",
    LoggedIn = "با موفقیت وارد حساب کاربری خود شدید",

    Created='با موفقیت ایجاد شد!'
}

export enum ConflictMessage {
    Slug='چنین موردی قبلا با این اسلاگ ثبت شدذه است!'
}