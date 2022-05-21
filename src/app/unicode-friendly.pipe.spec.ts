import { UnicodeFriendlyPipe } from './unicode-friendly.pipe';

describe('UnicodeFriendlyPipe', () => {
  it('create an instance', () => {
    const pipe = new UnicodeFriendlyPipe();
    expect(pipe).toBeTruthy();
  });
});
