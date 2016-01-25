module MovieApp {
    export class Friend {
        private _id: number;
        private _username: string;
        private _list: Movie[];

        public get UserId(): number {
            return this._id;
        }
        public set UserId(id: number) {
            this._id = id;
        }

        public get Username(): string {
            return this._username;
        }
        public set Username(username: string) {
            this._username = username;
        }

        public get List(): Movie[] {
            return this._list;
        }
        public set List(list: Movie[]) {
            this._list = list;
        }
    }
} 