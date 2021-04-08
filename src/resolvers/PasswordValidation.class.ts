class PasswordValidation {
    private password: string
   
    private limitCases: string[] = ["890", "901", "109", "098", "yza", "zab", "baz", "azy", "YZA", "ZAB", "BAZ", "AZY"]
   
    constructor(password: string) {
      this.password = password
    }
   
    public validate() {
      return this.passesCharacterConstraints() && this.passesSequentialConstraints()
    }
   
    /**
     * (?=.*[A-Z]): Requires an uppercase [A-Z] letter
     * (?=.*[a-z]): Requires a lowercase [a-z] letter
     * (?=.*\d): Requires a number
     * (?!.*(.)\1{2}): Limit the quantity of repetitions to 2
     * .: Allows all characters
     * {8,16}: Limit the length of the password from 8 to 16
     */
   
    private passesCharacterConstraints() {
      return !!this.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*(.)\1{2}).{8,16}$/)
    }
   
    private passesSequentialConstraints() {
      for (let i = 0; i < this.password.length; i += 1) {
        if (i !== 0 && i !== this.password.length - 1) {
          if (this.areSequentialErrors(this.password[i - 1], this.password[i], this.password[i + 1])) {
            return false
          }
        }
      }
      return true
    }
   
    private areSequentialErrors(prev: string, act: string, next: string) {
      const prevAscii = prev.charCodeAt(0)
      const actAscii = act.charCodeAt(0)
      const nextAscii = next.charCodeAt(0)
   
      return (
        (prevAscii === actAscii - 1 && nextAscii === actAscii + 1) ||
        (prevAscii === actAscii + 1 && nextAscii === actAscii - 1) ||
        this.areSequentialErrorInLimitCases(prev, act, next)
      )
    }
   
    private areSequentialErrorInLimitCases(prev: string, act: string, next: string) {
      const number = prev + act + next
   
      return this.limitCases.includes(number)
    }
  }
   
  export default PasswordValidation