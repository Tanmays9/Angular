import { browser, by, element } from 'protractor';
import { getHostElement } from '@angular/core/src/render3';
import { SelectorContext } from '@angular/compiler';

export class AppPage {
  navigateTo(link: string) {
    return browser.get(link);
  }

  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }

  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }
}