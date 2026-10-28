import {useState, type ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import appCss from "@/index.css?url";
import NotFound from "@/pages/NotFound";

const TITLE = "ЭкоДрев — авторские столы, столики Бузулук";
const DESCRIPTION =
    "ЭкоДрев -  обеденные  столы журнальные столики кофейные столики детские столы. Круглые  прямоугольные квадратные нестандартные.Мебель для ресторанов. ";
const OG_IMAGE = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/og-image-1780986326602.jpg";
const SITE_URL = "https://экодревмебель.рф/";
const FAVICON = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/favicon-1788340800565.jpg";

const LD_BUSINESS = "{\"@context\": \"https://schema.org\", \"@type\": \"FurnitureStore\", \"name\": \"ЭкоДрев\", \"description\": \"Авторская мебель ручной работы из натурального дерева. Столы, кухни, корпусная мебель на заказ.\", \"url\": \"https://экодревмебель.рф/\", \"logo\": \"https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/og-image-1777968096797.jpg\", \"image\": \"https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/og-image-1777968096797.jpg\", \"telephone\": [\"+7-922-819-92-88\", \"+7-922-807-00-17\", \"+7-932-548-53-63\"], \"address\": {\"@type\": \"PostalAddress\", \"addressLocality\": \"Бузулук\", \"addressRegion\": \"Оренбургская область\", \"addressCountry\": \"RU\"}, \"areaServed\": {\"@type\": \"Country\", \"name\": \"Россия\"}, \"priceRange\": \"от 11 000 ₽\", \"hasMap\": \"https://yandex.ru/maps/?text=Бузулук\", \"sameAs\": []}";
const LD_CATALOG = "{\"@context\": \"https://schema.org\", \"@type\": \"ItemList\", \"name\": \"Каталог авторской мебели ЭкоДрев\", \"description\": \"Столы, корпусная мебель и кухни ручной работы из натурального дерева\", \"url\": \"https://экодревмебель.рф/\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"item\": {\"@type\": \"Product\", \"name\": \"Стол «Семейный очаг»\", \"description\": \"Дизайнерский круглый стол из шпона дуба 5 мм и керамогранита. Коллекция 2026.\", \"offers\": {\"@type\": \"Offer\", \"price\": \"120000\", \"priceCurrency\": \"RUB\", \"availability\": \"https://schema.org/InStock\"}}}, {\"@type\": \"ListItem\", \"position\": 2, \"item\": {\"@type\": \"Product\", \"name\": \"Стол «Лунная соната»\", \"description\": \"Дизайнерский круглый стол из карагача и МДФ. Коллекция 2026.\", \"offers\": {\"@type\": \"Offer\", \"price\": \"40000\", \"priceCurrency\": \"RUB\", \"availability\": \"https://schema.org/InStock\"}}}, {\"@type\": \"ListItem\", \"position\": 3, \"item\": {\"@type\": \"Product\", \"name\": \"Стол «В осеннем бору»\", \"description\": \"Прямоугольный стол из дуба и МДФ. Коллекция «Осенняя рапсодия».\", \"offers\": {\"@type\": \"Offer\", \"price\": \"50000\", \"priceCurrency\": \"RUB\", \"availability\": \"https://schema.org/InStock\"}}}, {\"@type\": \"ListItem\", \"position\": 4, \"item\": {\"@type\": \"Product\", \"name\": \"Столик «Середина лета»\", \"description\": \"Прямоугольный стол с реечной опорой из дуба и МДФ. Коллекция «Мелодии лета».\", \"offers\": {\"@type\": \"Offer\", \"price\": \"25000\", \"priceCurrency\": \"RUB\", \"availability\": \"https://schema.org/InStock\"}}}, {\"@type\": \"ListItem\", \"position\": 5, \"item\": {\"@type\": \"Product\", \"name\": \"Кофейный столик «Летний полдень»\", \"description\": \"Кофейный столик из дуба. Коллекция «Мелодии лета».\", \"offers\": {\"@type\": \"Offer\", \"price\": \"11000\", \"priceCurrency\": \"RUB\", \"availability\": \"https://schema.org/InStock\"}}}]}";

const METRIKA = `(function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(101026698, "init", {
    trustedDomains: ["poehali.dev", "экодревмебель.рф"],
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true
});`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {name: "keywords", content: "мебель Бузулук, столы из дерева, авторская мебель, мебель на заказ, столы из массива дуба, кухни на заказ, корпусная мебель, ЭкоДрев"},
            {name: "author", content: "ЭкоДрев"},
            {name: "robots", content: "index, follow"},
            {name: "yandex-verification", content: "43c0e27e9e0a75e2"},
            {property: "og:type", content: "website"},
            {property: "og:url", content: SITE_URL},
            {property: "og:title", content: TITLE},
            {property: "og:description", content: DESCRIPTION},
            {property: "og:image", content: OG_IMAGE},
            {property: "og:image:width", content: "4800"},
            {property: "og:image:height", content: "2520"},
            {property: "og:image:alt", content: "ЭкоДрев — авторская мебель из дерева в Бузулуке"},
            {property: "og:locale", content: "ru_RU"},
            {property: "og:site_name", content: "ЭкоДрев"},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: "ЭкоДрев — авторская мебель из дерева в Бузулуке"},
            {name: "twitter:description", content: "Авторская мебель ручной работы: столы из массива дуба, кухни и корпусная мебель на заказ. Гарантия до 10 лет."},
            {name: "twitter:image", content: OG_IMAGE},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "canonical", href: SITE_URL},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap",
            },
            {rel: "icon", type: "image/jpg", href: FAVICON},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {type: "application/ld+json", children: LD_BUSINESS},
            {type: "application/ld+json", children: LD_CATALOG},
            {children: METRIKA},
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFound,
});

function RootComponent() {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <RootDocument>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster/>
                    <Sonner/>
                    <Outlet/>
                </TooltipProvider>
            </QueryClientProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div><img src="https://mc.yandex.ru/watch/101026698" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}
