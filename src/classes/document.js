class DocumentIdAndUserID {
    constructor( userId , id ) {
        this.userId = userId;
        this.id= id;
      }
}

class DocumentIdAndContent {
    constructor(  id, userId ,title, purpose, content, date) {
        this.id= id;
        this.userId = userId;
        this.title= title;
        this.purpose= purpose;
        this.content= content;
        this.date= date;
      }
}export {DocumentIdAndUserID, DocumentIdAndContent};
