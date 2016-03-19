/**
 * Created by Eric on 18/02/2016.
 */
import {Component} from 'angular2/core';
import {MovieGraph} from './movies.graph';
import {MovieService} from './movies.service';

@Component({
    selector: 'movies-app',
    template: `<h1>explore</h1>
               <div>
                    <input type="text" [(ngModel)]="query" />
                    <input type="button" (click)="g.addMovieToGarph(query)" value="Search" />
                </div>
                <movies-garph #g></movies-garph>
    `,
    directives: [MovieGraph],
    providers: [MovieService]
})
export class MoviesApp {
    query: string;
}