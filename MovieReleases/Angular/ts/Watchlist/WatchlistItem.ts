module MovieApp {
    export class WatchlistItem {
        private _id: number;
        private _movie: Movie;

        public get Id(): number {
            return this._id;
        }
        public set Id(id: number) {
            this._id = id;
        }

        public get Movie(): Movie {
            return this._movie;
        }
        public set Movie(movie: Movie) {
            this._movie = movie;
        }
    }
}