/* eslint-disable max-classes-per-file */
const RegexService = {
    RegexConstants: {
        REGEX_EMAIL:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //eslint-disable-next-line
        REGEX_PHONE: /^[0-9\+]{10,12}$/,

        REGEX_NUMBER: /^\+?([1-9]\d*)$/,
    },

    isEmail(input: string): boolean {
        const re = new RegExp(RegexService.RegexConstants.REGEX_EMAIL);
        return re.test(input);
    },

    isPhone(input: string): boolean {
        const re = new RegExp(RegexService.RegexConstants.REGEX_PHONE);
        return re.test(input);
    },

    isNumber(input: string): boolean {
        const re = new RegExp(RegexService.RegexConstants.REGEX_NUMBER);
        return re.test(input);
    }
}

export default RegexService