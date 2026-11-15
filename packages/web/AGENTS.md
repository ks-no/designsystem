# @ks-digital/designsystem-web

Less is more. Components start as plain HTML, get their look from CSS, and use
JavaScript only where nothing else will do. Each layer must work without the
next one.

## Principles

1. **Use the simplest layer that works.** HTML before CSS, CSS before JS. A
   component with no JS, styled only in `packages/themes`, is the best kind.
2. **Use the platform.** Native elements and attributes (`button`, `details`,
   `dialog`, `popover`, `:has()`) give keyboard, focus and semantics for free.
   Don't rebuild what the browser already does.
3. **Every addition needs a reason.** Each attribute, option, event and
   dependency must have a clear need. Good defaults beat configuration, and
   deleting code beats adding it. Prefer one data attribute on a native element
   over a new custom element.
4. **JS adds, it never carries.** Assume the script can be disabled, blocked,
   slow or broken. Hide anything that can't work without it, and leave what it
   acted on usable by hand. Hide with the themes CSS, using an attribute the
   setup code sets, not `@media (scripting: none)`:

   ```css
   @layer ksd {
     [data-copy]:not([data-copy-state]) {
       display: none;
     }
   }
   ```

5. **Nothing looks interactive without working.** No focusable controls that do
   nothing, and none without an accessible name. Setup refuses elements it
   can't make accessible, so they never get the marker and stay hidden.

## Checklist

- [ ] Works, or is hidden on purpose, with JS disabled
- [ ] Setup is safe to run twice and picks up elements added later
      (`onMutation`)
- [ ] The spec checks that the marker is set on valid elements, not on refused
      ones
- [ ] The `.mdx` says what users get without JS

`src/copy-button/` is the reference implementation.
