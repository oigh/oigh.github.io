export class ArchiveManager {
    constructor() {
        this._localGameStatus = null;
        this._obs = new Set();
    }

    subscribe(observer) {
        this._obs.add(observer);
        if (this._localGameStatus !== null) {
            observer(this._localGameStatus);
        }
        return () => this.unsubscribe(observer);
    }

    unsubscribe(observer) {
        this._obs.delete(observer);
    }

    get LocalGameStatus() {
        if (this._localGameStatus !== null) {
            return this._localGameStatus;
        }

        const s = localStorage.getItem("GameStatus");
        try {
            this._localGameStatus = s ? JSON.parse(s) : null;
        } catch (e) {
            console.error("parse archive error:", e);
            this._localGameStatus = null;
        }

        return this._localGameStatus;
    }

    set LocalGameStatus(value) {
        this._localGameStatus = value;
        const s = JSON.stringify(this._localGameStatus);
        localStorage.setItem("GameStatus", s);

        this._obs.forEach(observer => {
            try {
                observer(value);
            } catch (e) {
                console.error("observer error:", e);
            }
        });
    }

    addProp(key, count) {
        const s = this.LocalGameStatus;
        if (s.props[key]) {
            s.props[key] = Number(s.props[key]) + Number(count);
        }
        else {
            s.props[key] = Number(count);
        }
        this.LocalGameStatus = s;
    }
}