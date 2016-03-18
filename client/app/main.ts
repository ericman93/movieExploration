/**
 * Created by Eric on 18/02/2016.
 */
import 'rxjs/Rx';
import {bootstrap}    from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http';
import {MoviesApp}    from './movies.app'

bootstrap(MoviesApp, [HTTP_PROVIDERS]);