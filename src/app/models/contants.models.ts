export class Constants {
    static KEY_DEFAULT_LANGUAGE: string = 'cc_dl';
    static MOBILE_PATTERN = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    static EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    static EMAIL_WITH_PHONE_PATTERN = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$';
}