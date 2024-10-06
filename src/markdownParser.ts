import { MarkDown} from './MarkDown';

/**
 * core renderer of HTML for a given markdown string
 *
 */
export function render(markdown: string) {
  const items = new MarkDown()
  return markdown.split('\n').reduce((result, line) => {
    result += items.substituteHTML(line) + '\n'
    return result
  }, '')
}