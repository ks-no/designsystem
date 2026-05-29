import { Button } from '@ks-digital/designsystem-angular/button'
import { Dialog } from '@ks-digital/designsystem-angular/dialog'
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Dropdown } from './dropdown'

type DropdownArgs = CommonArgs & {
  'data-variant': 'default' | 'tinted'
  'data-placement':
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'right'
}

const meta: Meta<DropdownArgs> = {
  component: Dropdown,
  decorators: [
    moduleMetadata({
      imports: [Button, Dialog, Dropdown],
    }),
  ],
  title: 'Dropdown',
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
    'data-placement': {
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ],
      control: { type: 'radio' },
    },
  },
}
export default meta
type Story = StoryObj<DropdownArgs>

export const Fullmakt: Story = {
  args: {
    'data-placement': 'bottom-end',
  },
  render: (args) => ({
    props: { ...args, isOpen: false },
    template: `
      <button ksd-button data-variant="tertiary" type="button" popoverTarget="dropdown">
        <img alt="" style="width:1.2em; height:auto; margin-right: var(--ds-size-0);" src="https://static.fiks.ks.no/img/kommunevaapen/1502.png" />
        Ola Normann
        <svg [style.transform]="isOpen ? '' : 'scaleY(-1)'" style="transition: transform 0.2s;" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M11.47 7.97a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 1 1-1.06 1.06L12 9.56l-4.97 4.97a.75.75 0 0 1-1.06-1.06z" clip-rule="evenodd"></path></svg>
      </button>
      <div ksd-dropdown id="dropdown" popover="auto" data-placement="${args['data-placement'] ?? 'bottom-end'}" data-variant="${args['data-variant'] ?? 'default'}" (toggle)="isOpen = $event.newState === 'open'">
         <ul>
          <li>
            <a ksd-button data-variant="tertiary" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
              Min profil
            </a>
          </li>
          <li>
            <button ksd-button data-variant="tertiary">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="112 40 48 40 48 216 112 216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="112" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="184 88 224 128 184 168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
              Logg ut
            </button>
          </li>
        </ul>
      </div>
    `,
  }),
}

export const Icons: Story = {
  args: {
    'data-placement': 'bottom-end',
  },
  render: (args) => ({
    props: args,
    template: `
      <button ksd-button data-variant="primary" type="button" popoverTarget="dropdown-icons">Dropdown</button>
      <div ksd-dropdown id="dropdown-icons" popover="auto" data-placement="${args['data-placement'] ?? 'bottom-end'}" data-variant="${args['data-variant'] ?? 'default'}">
        <ul>
          <li>
            <a ksd-button data-variant="tertiary" href="https://github.com/digdir/designsystemet" target="_blank" rel="noreferrer">
              <svg aria-hidden xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5 5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5 5 5 0 0 0-5-5"/></svg>
              Github
            </a>
          </li>
          <li>
            <a ksd-button data-variant="tertiary" href="https://designsystemet.no" target="_blank" rel="noreferrer">
              <svg aria-hidden xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5 5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5 5 5 0 0 0-5-5"/></svg>
              Designsystemet.no
            </a>
          </li>
        </ul>
      </div>
    `,
  }),
}

export const WithoutTrigger: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <button ksd-button data-variant="primary" type="button" popovertarget="dropdown-without-trigger">Dropdown</button>
      <div ksd-dropdown id="dropdown-without-trigger" popover="auto" data-placement="bottom-end">
        <ul>
          <li>
            <button ksd-button data-variant="tertiary" type="button">Item</button>
          </li>
        </ul>
      </div>
    `,
  }),
}

export const WithNestedDropdown: Story = {
  args: {
    'data-placement': 'bottom-end',
  },
  render: (args) => ({
    props: args,
    template: `
      <button ksd-button data-variant="primary" type="button" popoverTarget="dropdown-outer">Dropdown</button>
      <div ksd-dropdown id="dropdown-outer" popover="auto" data-placement="${args['data-placement'] ?? 'bottom-end'}" data-variant="${args['data-variant'] ?? 'default'}">
        <ul>
          <li>
            <button ksd-button data-variant="tertiary" type="button" popoverTarget="dropdown-inner">Dropdown</button>
            <div ksd-dropdown id="dropdown-inner" popover="auto" data-placement="right-start">
              <ul>
                <li>
                  <button ksd-button data-variant="tertiary" type="button">Nested</button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    `,
  }),
}
