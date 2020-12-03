class DocumentIdAndUserID {
  constructor(userId, id) {
    this.userId = userId;
    this.id = id;
  }
}

class DocumentDto {
  constructor(id, userId, title, purpose, date) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.purpose = purpose;
    this.date = date;
  }
}

class DocumentDtoNoIdAndDate {
  constructor(userId, title, purpose) {
    this.userId = userId;
    this.title = title;
    this.purpose = purpose;
  }
}
export { DocumentIdAndUserID, DocumentDto, DocumentDtoNoIdAndDate };
