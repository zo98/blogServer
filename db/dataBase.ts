class DataBase {
  fields: string[]
  AUTO_INCREMENT: number
  constructor() {
    this.AUTO_INCREMENT = 0
    this.fields = ['id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "id"', 'create_time TIMESTAMP DEFAULT NOW() COMMENT "创建时间"', 'update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL COMMENT "最后一次更新时间"',]
  }
}

class Classify extends DataBase {
  constructor(fields: string[]) {
    super()
    this.fields = [...this.fields, 'name VARCHAR(80) NOT NULL COMMENT "分类名"', 'cover VARCHAR(255) COMMENT "分类封面"']
  }
}


class Article extends DataBase {
  constructor(fields: string[]) {
    super()
    this.fields = [...this.fields, ...fields]
  }
}

class Users extends DataBase {
  constructor(fields: string[]) {
    super()
    this.fields = [...this.fields, ...fields]
  }
}

export = {}