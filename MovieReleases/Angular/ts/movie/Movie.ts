module MovieApp {
    export class Movie {
        private _url : string;
        private _year : string;
        private _thumbnail: string;
        private _plot: string;
        private _duration: string;
        private _downloaded: boolean;
        private _title: string;
        private _movieType: number;
        private _imdb: string;
        private _inDownloadList: boolean;

        public get Url(): string {
            return this._url;
        }
        public set Url(url: string) {
            this._url = url;
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

        public get Title(): string {
            return this._title;
        }
        public set Title(title: string) {
            this._title = title;
        }

        public get MovieType(): number {
            return this._movieType;
        }
        public set MovieType(movieType: number) {
            this._movieType = movieType;
        }

        public get Imdb(): string {
            return this._imdb;
        }
        public set Imdb(imdb: string) {
            this._imdb = imdb;
        }

        public get InDownloadList(): boolean {
            return this._inDownloadList;
        }
        public set InDownloadList(inDownloadList: boolean) {
            this._inDownloadList = inDownloadList;
        }
    }
}