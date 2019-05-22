
import axios from 'axios';
import { END_POINT, API_URL_DEV } from './apiRegister';
export class AuthService
{
  toPath = '';
  constructor ()
  {

  }

  ifNotAuthenticated = ( to, from, next ) =>
  {
    if ( !localStorage.getItem( 'ACCESS_TOKEN' ) ) {
      next()
      return
    }
    next( '/' )
  }

  ifAuthenticated = ( to, from, next ) =>
  {
    localStorage.setItem( 'toPath', to.path )
    if ( localStorage.getItem( 'ACCESS_TOKEN' ) ) {
      
      if ( this.checkPath( to.path ) ) {
        // localS torage.clear()
        next( '/members' )
        return
      }
      next()
      return
    }
    localStorage.clear()
    next( '/pages/login' )
  }

  getToPath ()
  {
    return localStorage.getItem( 'toPath' );
  }
  checkPath ( path )
  {
    const member = JSON.parse( localStorage.getItem( 'MEMBER' ) );
    const paths = path.split( '/' );
    return paths[ 1 ] !== 'members' && member && member.provider === 'member';
  }

  loginUser ( user )
  {
    return new Promise( ( resolve, reject ) =>
    {
      axios( { url: API_URL_DEV + END_POINT.login, data: user, method: 'POST' } )
        .then( resp =>
        {
          localStorage.setItem( 'ACCESS_TOKEN', resp.headers[ 'access-token' ] ) // store the token in localstorage
          localStorage.setItem( 'UID', resp.headers[ 'uid' ] ) // store the uid in localstorage
          localStorage.setItem( 'CLIENT', resp.headers[ 'client' ] ) // store the client in localstorage
          localStorage.setItem( 'USER', JSON.stringify( resp.data.data ) ) // store the client in localstorage
          resolve( resp )
        } )
        .catch( err =>
        {
          this.logout(); // if the request fails, remove any possible user token if possible
          reject( err )
        } )
    } )
  }

  loginMember ( user )
  {
    return new Promise( ( resolve, reject ) =>
    {
      axios( { url: API_URL_DEV + END_POINT.loginMember, data: user, method: 'POST' } )
        .then( resp =>
        {
          localStorage.setItem( 'ACCESS_TOKEN', resp.headers[ 'access-token' ] ) // store the token in localstorage
          localStorage.setItem( 'UID', resp.headers[ 'uid' ] ) // store the uid in localstorage
          localStorage.setItem( 'CLIENT', resp.headers[ 'client' ] ) // store the client in localstorage
          localStorage.setItem( 'MEMBER', JSON.stringify( resp.data.member ) ) // store the client in localstorage
          console.log( resp, resp.data.member )
          resolve( resp )
        } )
        .catch( err =>
        {
          this.logout(); // if the request fails, remove any possible user token if possible
          reject( err )
        } )
    } )
  }

  registerMember ( member )
  {
    return new Promise( ( resolve, reject ) =>
    {
      axios( { url: API_URL_DEV + END_POINT.registerMember, data: member, method: 'POST' } )
        .then( resp =>
        {
          resolve( resp )
        } )
        .catch( err =>
        {
          reject( err )
        } )
    } )
  }

  logout ()
  {
    localStorage.clear();
  }
}

