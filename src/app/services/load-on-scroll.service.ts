import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LoadOnScrollService {
  isScrolledToBottom(container: any): boolean {
    const containerHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const scrollBottom = scrollHeight - (scrollTop + containerHeight);
    const bottomBuffer = 50;
    return scrollBottom < bottomBuffer;
  }

  loadNextBatch(currentBatch: any, itemsPerPage: number, items: any, displayedItems: any) {
    currentBatch++;
    const startIndex = currentBatch * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (endIndex <= items.length) {
      displayedItems = [...displayedItems, ...items.slice(startIndex, endIndex)];
      return displayedItems;
    }
  }
}