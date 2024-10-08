import { render } from '../src';

import * as chai from 'chai';

const expect = chai.expect;
describe('Parse markdown', () => {

    it('should render header1 correctly', () => {
        const md = '# Sample Document'
        const html = '<h1>Sample Document</h1>\n'
        expect(render(md)).to.equal(html);
    });

    it('should render header2 correctly', () => {
        const md = '## Sample Document'
        const html = '<h2>Sample Document</h2>\n'
        expect(render(md)).to.equal(html);
    });

    it('should render header3 correctly', () => {
        const md = '### Sample Document'
        const html = '<h3>Sample Document</h3>\n'
        expect(render(md)).to.equal(html);
    });

    it('should render header4 correctly', () => {
        const md = '#### Sample Document'
        const html = '<h4>Sample Document</h4>\n'
        expect(render(md)).to.equal(html);
    });

    it('should render header5 correctly', () => {
        const md = '##### Sample Document'
        const html = '<h5>Sample Document</h5>\n'
        expect(render(md)).to.equal(html);
    });

    it('should render header6 correctly', () => {
        const md = '###### Sample Document'
        const html = '<h6>Sample Document</h6>\n'
        expect(render(md)).to.equal(html);
    });

    it('should render link correctly', () => {
        const md = '[Link text](https://www.example.com)'
        const html = '<p><a href="https://www.example.com">Link text</a></p>\n'
        expect(render(md)).to.equal(html);
    });

    it('should render complex markdown correctly' , () => {

        const md = '# Sample Document\n' +
            '\n' +
            'Hello!\n' +
            '\n' +
            'This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.'

        const html = '<h1>Sample Document</h1>\n' +
            '<p>Hello!</p>\n' +
            '<p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>' +
            '\n'
        expect(render(md)).to.equal(html);
    });

    it('should render complex markdown with multiple adjacent unformatted lines correctly' , () => {

        const md = '# Header one\n' +
            '\n' +
            'Hello there\n' +
            '\n' +
            'How are you?\n' +
            'What\'s going on?\n' +
            '\n' +
            '## Another Header\n' +
            '\n' +
            'This is a paragraph [with an inline link](http://google.com). Neat, eh?\n' +
            '\n' +
            '## This is a header [with a link](http://yahoo.com)'

        const html = '<h1>Header one</h1>\n' +
            '<p>Hello there</p>\n' +
            '<p>How are you?\n' +
            'What\'s going on?</p>\n' +
            '<h2>Another Header</h2>\n' +
            '<p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh?</p>\n' +
            '<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>' +
            '\n'
        expect(render(md)).to.equal(html);
    });

});
