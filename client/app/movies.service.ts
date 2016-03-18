import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class MovieService {
    private _moviesUrl = 'http://localhost:1234/explore/';

    constructor(private http: Http) {
    }

    getMovieByName(name: string) {
    }

    explore(nodeId, nodeType) {
        console.log('explore - '+ nodeType + " - " +nodeId);
        return this.http.get(this._moviesUrl + nodeType + "/" + nodeId)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}