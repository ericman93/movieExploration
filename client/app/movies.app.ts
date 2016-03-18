/**
 * Created by Eric on 18/02/2016.
 */
import {Component} from 'angular2/core';
import {MovieGraph} from './movies.graph';
import {MovieService} from './movies.service';

@Component({
    selector: 'movies-app',
    template: '<h1>explore</h1> <movies-garph></movies-garph>',
    directives: [MovieGraph],
    providers: [MovieService]
})
export class MoviesApp {
}