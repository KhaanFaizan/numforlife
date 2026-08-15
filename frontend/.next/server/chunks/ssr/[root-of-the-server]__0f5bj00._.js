module.exports=[91970,a=>{a.v({className:"azeret_mono_93224bb9-module__D1EY4a__className",variable:"azeret_mono_93224bb9-module__D1EY4a__variable"})},7036,a=>{a.v({className:"work_sans_8a466175-module__Qd1HcG__className",variable:"work_sans_8a466175-module__Qd1HcG__variable"})},44210,a=>{"use strict";var b=a.i(7997),c=a.i(5246),d=a.i(7036);let e={className:d.default.className,style:{fontFamily:"'Work Sans', 'Work Sans Fallback'",fontStyle:"normal"}};null!=d.default.variable&&(e.variable=d.default.variable);var f=a.i(91970);let g={className:f.default.className,style:{fontFamily:"'Azeret Mono', 'Azeret Mono Fallback'",fontStyle:"normal"}};null!=f.default.variable&&(g.variable=f.default.variable);var h=a.i(54674),i=a.i(55363),j=a.i(67872);a.i(66680);var k=a.i(61299);function l(a){return{id:a.id,title:a.title,message:a.message,href:a.href,ctaLabel:a.cta_label,variant:a.variant,enabled:!!a.enabled,priority:a.priority,startsAt:a.starts_at,endsAt:a.ends_at,createdAt:a.created_at,updatedAt:a.updated_at}}var m=a.i(57573),n=a.i(85689),o=a.i(54544);let p=(0,a.i(10).rootMetadata)();async function q({children:a}){var d;let f="light"===(d=(await (0,c.cookies)()).get("shuyi-theme")?.value)||"dark"===d?d:null,p=await (0,j.getPublishedContent)(),r=(0,n.getSiteFlags)(),s=function(a=3){return(0,k.getDb)().exec(`
    CREATE TABLE IF NOT EXISTS cms_banners (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      href TEXT,
      cta_label TEXT,
      variant TEXT NOT NULL DEFAULT 'info'
        CHECK(variant IN ('info', 'promo', 'warning')),
      enabled INTEGER NOT NULL DEFAULT 1,
      priority INTEGER NOT NULL DEFAULT 0,
      starts_at TEXT,
      ends_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_cms_banners_enabled_priority
      ON cms_banners(enabled, priority DESC, updated_at DESC);
  `),(0,k.getDb)().prepare(`SELECT id, title, message, href, cta_label, variant, enabled, priority,
              starts_at, ends_at, created_at, updated_at
         FROM cms_banners
        WHERE enabled = 1
        ORDER BY priority DESC, updated_at DESC`).all().filter(a=>(function(a,b=new Date){let c=b.getTime();if(a.starts_at){let b=Date.parse(a.starts_at);if(!Number.isNaN(b)&&c<b)return!1}if(a.ends_at){let b=Date.parse(a.ends_at);if(!Number.isNaN(b)&&c>b)return!1}return!0})(a)).slice(0,a).map(l)}();return(0,b.jsx)("html",{lang:"zh-CN","data-theme":f??void 0,"data-scroll-behavior":"smooth",className:`${e.variable} ${g.variable}`,children:(0,b.jsxs)("body",{className:"min-h-screen bg-bg font-sans text-fg antialiased",children:[(0,b.jsx)(h.JsonLd,{data:[(0,o.organizationJsonLd)(),(0,o.websiteJsonLd)()]}),(0,b.jsx)(i.ContentProvider,{initialPublished:p,children:(0,b.jsx)(m.LayoutShell,{maintenanceMode:r.maintenance_mode,shopEnabled:r.shop_enabled,showAppDownloadCta:r.show_app_download_cta,banners:s,children:a})})]})})}a.s(["default",0,q,"metadata",0,p],44210)},77451,function(a){a.n(a.i(44210))},83076,a=>{"use strict";a.s(["LayoutShell",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call LayoutShell() from the server but LayoutShell is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/frontend/components/layout/LayoutShell.tsx","LayoutShell")},57573,a=>{"use strict";var b=a.i(83076);a.n(b)},66729,a=>{"use strict";a.s(["ContentProvider",()=>c,"useCMS",()=>d,"useLiveCMS",()=>e]);var b=a.i(11857);let c=(0,b.registerClientReference)(function(){throw Error("Attempted to call ContentProvider() from the server but ContentProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/packages/shared/lib/cms/content-provider.tsx","ContentProvider"),d=(0,b.registerClientReference)(function(){throw Error("Attempted to call useCMS() from the server but useCMS is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/packages/shared/lib/cms/content-provider.tsx","useCMS"),e=(0,b.registerClientReference)(function(){throw Error("Attempted to call useLiveCMS() from the server but useLiveCMS is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/packages/shared/lib/cms/content-provider.tsx","useLiveCMS")},55363,a=>{"use strict";var b=a.i(66729);a.n(b)},85689,a=>{"use strict";a.i(2157);var b=a.i(50227),c=a.i(61299);let d=Object.fromEntries([{key:"maintenance_mode",label:"Maintenance mode",description:"When enabled, show a maintenance notice on public pages (server-rendered).",defaultValue:!1},{key:"shop_enabled",label:"Shop enabled",description:"Controls whether /shop is linked prominently in navigation.",defaultValue:!0},{key:"membership_page_enabled",label:"Membership page enabled",description:"Allows public access to /membership pricing and benefits.",defaultValue:!0},{key:"show_app_download_cta",label:"App download CTAs",description:"Shows App download prompts on the homepage, shop, and membership pages.",defaultValue:!0}].map(a=>[a.key,a.defaultValue]));b.default.join(process.cwd(),"public","site-flags.json"),a.s(["getSiteFlags",0,function(){(0,c.getDb)().exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      updated_by TEXT
    );
  `);let a=(0,c.getDb)().prepare("SELECT key, value_json FROM site_settings WHERE key LIKE 'flag:%'").all(),b={...d};for(let c of a){let a=c.key.replace(/^flag:/,"");if(a in b)try{b[a]=!!JSON.parse(c.value_json)}catch{}}return b}],85689)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f5bj00._.js.map