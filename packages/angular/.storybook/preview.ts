import type { Preview } from '@storybook/angular';
import { themes } from './themes';

function setTheme(href: string) {
    let link = document.getElementById("storybook-theme") as HTMLLinkElement | null;
    if (!link) {
        link = document.createElement("link");
        link.rel = "stylesheet";
        link.id = "storybook-theme";
        console.log('append link', link)
        document.head.appendChild(link);
    }
    link.href = href;
}

export const globalTypes = {
    theme: {
        name: "Theme",
        description: "Global theme for components",
        defaultValue: themes[0].href,
        toolbar: {
            icon: "paintbrush",
            items: themes.map((t) => ({ value: t.href, title: t.name })),
            showName: true,
        },
    },
};

export const decorators = [
    (story: any, context: any) => {
        setTheme(context.globals.theme);
        return story();
    },
];

const preview: Preview = {
    parameters: {
        layout: 'centered',
    },
};

export default preview;