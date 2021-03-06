import formatter from './lib/formatter';
import getMessage from './lib/getMessage';
import Paint from './lib/Paint';
import style from './configs/defaultStyle'

import type { category, DefineMessage } from './types/DefineMessage';

const paint = new Paint();

export default class Speak {
  dictionary: DefineMessage;
  category: category | null;
  setting: DefineMessage['settings'];
  readonly output: Console['log'];

  constructor(dictionary?: DefineMessage) {
    this.dictionary = dictionary || {};
    this.setting = dictionary?.settings;
    this.output = console.log;
    this.category = null;
  }

  private display(cat: category, messageId: string): void {
    this.category = cat;
    const data = this.dictionary[cat]?.message;
    if (data) {
      const text = getMessage(data, messageId, this.setting?.defaultLang);
      this.output(paint.paint(formatter(this.category, text), style[cat]));
    }
  }

  log(messageId: string): void {
    this.display('log', messageId);
  }

  error(messageId: string): void {
    this.display('error', messageId);
  }

  warn(messageId: string): void {
    this.display('warn', messageId);
  }

  complete(messageId: string): void {
    this.display('complete', messageId);
  }

  running(messageId: string): void {
    this.display('running', messageId);
  }
}
