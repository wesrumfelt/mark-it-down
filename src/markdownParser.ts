import { MarkDown} from './MarkDown';

/**
 * Core renderer of HTML content for a given markdown string
 *
 * @param  {String} markdown   Markdown-formatted string
 * @return {String}            HTML representation
 */
export function render(markdown: string) {
  const items = new MarkDown()
  return items.convert(markdown)
}