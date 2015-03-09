module MovieApp {
    export class Movie {
        private _url : string;
        private _title : string;
        private _year : string;
        private _thumbnail: string;
        private _imdbId: string;
        private _plot: string;
        private _duration: string;
        private _downloaded: boolean;

        public get Url(): string {
            return this._url;
        }

        public set Url(url: string) {
            this._url = url;
        }

        public get Title(): string {
            return this._title;
        }

        public set Title(title: string) {
            this._title = title;
        }

        public get Year(): string {
            return this._year;
        }

        public set Year(year: string) {
            this._year = year;
        }

        public get Thumbnail(): string {
            return this._thumbnail;
        }

        public set Thumbnail(thumbnail: string) {
            this._thumbnail = thumbnail;
        }

        public get ImdbId(): string {
            return this._imdbId;
        }

        public set ImdbId(imdbId: string) {
            this._imdbId = imdbId;
        }

        public get Plot(): string {
            return this._plot;
        }

        public set Plot(plot: string) {
            this._plot = plot;
        }

        public get Duration(): string {
            return this._duration;
        }

        public set Duration(duration: string) {
            this._duration = duration;
        }

        public get Downloaded(): boolean {
            return this._downloaded;
        }

        public set Downloaded(downloaded: boolean) {
            this._downloaded = downloaded;
        }
    }
}