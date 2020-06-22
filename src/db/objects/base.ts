import {mapper} from "../index";

export class Base<T extends Base<T>> {
    static create(attrs) {
        return Object.assign(new this(), attrs);
    }

    put()  {
        return mapper.put(this);
    }

    get() {
        return mapper.get(this);
    }

    update() {
        return mapper.update(this);
    }

    delete() {
        return mapper.delete(this);
    }
}
