import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private data = {
    en: {
      title: "Hello world"
    },
    ka: {
      title: 'გამარჯობა სამყარო'
    }
  }

  getHello(lang: string): string {
    return this.data[lang]?.title;
  }
}
