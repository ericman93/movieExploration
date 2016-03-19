import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class MovieService {
    private _moviesUrl = 'http://localhost:1234/';

    constructor(private http: Http) {
    }

    getMovieByName(name: string) {
        return this.http.get(this._moviesUrl + 'search', {
                search: 'q='+name
            })
            .map(res => res.json())
            .catch(this.handleError);
    }

    explore(nodeId, nodeType) {
        return this.http.get(this._moviesUrl + 'explore/' + nodeType + "/" + nodeId)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}