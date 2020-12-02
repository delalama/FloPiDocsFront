class DocumentIdAndUserID {
  constructor(userId, id) {
    this.userId = userId;
    this.id = id;
  }
}

class DocumentDto {
  constructor(id, userId, title, purpose, content, date) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.purpose = purpose;
    this.content = content;
    this.date = date;
  }
}

class DocumentDtoNoIdAndDate {
  constructor(userId, title, purpose, content) {
    this.userId = userId;
    this.title = title;
    this.purpose = purpose;
    this.content = content;
  }
}
export { DocumentIdAndUserID, DocumentDto, DocumentDtoNoIdAndDate };
