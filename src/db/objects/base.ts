import {mapper} from "../index";

export class Base {
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
