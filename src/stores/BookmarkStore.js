import {observable, action} from 'mobx';
import axios from '../axios-instance';

class BookmarkStore {

    @observable isloading = null;
    @observable bookmark = {};
    @observable error = null;

    @action AddBookmark = (movieObject) => {

        const payload = {
            'imdb_id' : movieObject.imdbID,
            'rating'  : movieObject.imdbRating,
            'poster'  : movieObject.Poster,
            'title'   : movieObject.Title,
            'runtime' : movieObject.Runtime
        };

        this.isloading = false;

        axios.post('/bookmark', payload, {
            'headers' : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                this.isloading = true;
            }).catch(res => {
                this.error = res.message;
                this.isloading = true;
        });
    };

    @action GetBookmarks = () => {

        this.isloading = false;

        axios.get('bookmarks', {
            'headers' : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.bookmark = res.data;
            this.isloading = true;
        }).catch(res => {
            console.log(res.data);
        });
    };

    @action DeleteBookmark = (id) => {

        this.isloading = false;

        const payload = {
            'imdb_id' : id
        };

        axios.post('delete-bookmark', payload, {
            'headers' : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.GetBookmarks();
        }).catch(res => {
            console.log(res.data);
        });
    }
}

const store = new BookmarkStore();
export default store;
