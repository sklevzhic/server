module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}