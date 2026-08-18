module.exports=[85148,(a,b,c)=>{b.exports=a.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},66680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},2157,(a,b,c)=>{b.exports=a.x("node:fs",()=>require("node:fs"))},50227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},91970,a=>{a.v({className:"azeret_mono_93224bb9-module__D1EY4a__className",variable:"azeret_mono_93224bb9-module__D1EY4a__variable"})},7036,a=>{a.v({className:"work_sans_8a466175-module__Qd1HcG__className",variable:"work_sans_8a466175-module__Qd1HcG__variable"})},28156,a=>{"use strict";var b=a.i(7997),c=a.i(7036);let d={className:c.default.className,style:{fontFamily:"'Work Sans', 'Work Sans Fallback'",fontStyle:"normal"}};null!=c.default.variable&&(d.variable=c.default.variable);var e=a.i(91970);let f={className:e.default.className,style:{fontFamily:"'Azeret Mono', 'Azeret Mono Fallback'",fontStyle:"normal"}};null!=e.default.variable&&(f.variable=e.default.variable);var g=a.i(55363),h=a.i(55101);async function i(){return(0,h.getPublishedContent)()}async function j({children:a}){let c=await i();return(0,b.jsx)("html",{lang:"zh-CN",className:`${d.variable} ${f.variable}`,children:(0,b.jsx)("body",{className:"min-h-screen bg-bg font-sans text-fg antialiased",children:(0,b.jsx)(g.ContentProvider,{initialPublished:c,children:a})})})}a.s(["default",0,j,"metadata",0,{title:"NumForLife Admin",robots:{index:!1,follow:!1}}],28156)},27774,function(a){a.n(a.i(28156))},66729,a=>{"use strict";a.s(["ContentProvider",()=>c,"useCMS",()=>d,"useLiveCMS",()=>e]);var b=a.i(11857);let c=(0,b.registerClientReference)(function(){throw Error("Attempted to call ContentProvider() from the server but ContentProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/packages/shared/lib/cms/content-provider.tsx","ContentProvider"),d=(0,b.registerClientReference)(function(){throw Error("Attempted to call useCMS() from the server but useCMS is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/packages/shared/lib/cms/content-provider.tsx","useCMS"),e=(0,b.registerClientReference)(function(){throw Error("Attempted to call useLiveCMS() from the server but useLiveCMS is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/packages/shared/lib/cms/content-provider.tsx","useLiveCMS")},55363,a=>{"use strict";var b=a.i(66729);a.n(b)},61299,a=>{"use strict";var b=a.i(2157),c=a.i(50227),d=a.i(85148);let e=null;a.s(["getDb",0,function(){var a;if(e)return e;let f=process.env.CMS_DATABASE_PATH?.trim()||c.default.join(process.cwd(),"data","numforlife_web.sqlite");return b.default.mkdirSync(c.default.dirname(f),{recursive:!0}),(e=new d.default(f)).pragma("journal_mode = WAL"),e.pragma("foreign_keys = ON"),(a=e).exec(`
    CREATE TABLE IF NOT EXISTS cms_pages (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      template TEXT NOT NULL DEFAULT 'homepage',
      status TEXT NOT NULL DEFAULT 'published',
      published_version_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cms_page_versions (
      id TEXT PRIMARY KEY,
      page_id TEXT NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
      version_no INTEGER NOT NULL,
      content_json TEXT NOT NULL,
      seo_json TEXT,
      state TEXT NOT NULL CHECK(state IN ('draft', 'published', 'archived')),
      created_at TEXT NOT NULL,
      UNIQUE(page_id, version_no)
    );

    CREATE INDEX IF NOT EXISTS idx_cms_versions_page_state
      ON cms_page_versions(page_id, state);

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      kcc_user_id TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active'
        CHECK(status IN ('active', 'suspended')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_admin_users_kcc_user_id
      ON admin_users(kcc_user_id);

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      admin_kcc_user_id TEXT NOT NULL,
      admin_email TEXT NOT NULL,
      admin_role TEXT NOT NULL,
      action TEXT NOT NULL,
      module TEXT NOT NULL,
      target TEXT,
      before_json TEXT,
      after_json TEXT,
      reason TEXT,
      ip TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at
      ON audit_logs(created_at DESC);
  `),a.prepare("PRAGMA table_info(cms_pages)").all().some(a=>"draft_version_id"===a.name)||a.exec("ALTER TABLE cms_pages ADD COLUMN draft_version_id TEXT"),e}],61299)},55101,43213,a=>{"use strict";var b=a.i(66680);let c={name:"数易赋能",tagline:"数易赋能，您的人生导航",subtitle:"We Don't Just Guide — We Empower You to Understand Yourself and Others.",cta:"请改变自己吧"},d=[{label:"常见问题",href:"/faq"},{label:"无障碍声明",href:"/accessibility-statement"},{label:"隐私政策",href:"/privacy-policy"},{label:"使用条款",href:"/terms-of-use"},{label:"退款政策",href:"/refund-policy"},{label:"配送政策",href:"/shipping-policy"}],e=[{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_0b3b028fa90c4fb9862f1f13c3ac2810mv2.png",alt:"数易赋能展示图 1",tall:!0},{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_e07c2a2eb04f4c3fa61a769470821a8cmv2.jpg",alt:"数易赋能展示图 2",tall:!1},{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_3ce398a3fd4a4b24be4963111688e2f8mv2.png",alt:"数易赋能展示图 3",tall:!0}],f=[{id:"divination-1",title:"占卜指引",description:"我们提供世界四大占卜指引，兼容多种设备，希望透过不同的学说与学派占卜基础为您全方位解决人生课题。",icon:"/icons/ecosystem/1.png"},{id:"divination-2",title:"占卜指引",description:"我们提供世界四大占卜指引，兼容多种设备，希望透过不同的学说与学派占卜基础为您全方位解决人生课题。",icon:"/icons/ecosystem/2.png"},{id:"knowledge",title:"知识与数据库",description:"我们的系统基于庞大的数据库，并且拥有AI辅助与导师亲自撰写，确保提供更准确的数据。",icon:"/icons/ecosystem/3.png"},{id:"tools",title:"工具",description:"我们严格筛选第三方供应，希望提供品质良好切价格平民的工具来提升您的能量与磁场。​这不是迷信。",icon:"/icons/ecosystem/4.png"},{id:"archive",title:"档案管理",description:"我们提供所有会员档案管理，用户可以对照不同时间点的解读自己与他人现况的变化，从而提升觉知。",icon:"/icons/ecosystem/5.png"},{id:"mentor",title:"导师辅导",description:"我们严格筛选导师，提供一定的认证体系（建立中），以最亲民的价格与方式与你探讨的人生课题。",icon:"/icons/ecosystem/6.png"}];a.s(["ecosystemFeatures",0,f,"footerLinks",0,d,"galleryImages",0,e,"partners",0,[{name:"SKKER",logo:"https://numforlife.com/wp-content/uploads/2025/06/Logo-1-1-300x297.png",href:"http://www.skker.com"},{name:"KCC Holdings",logo:"https://numforlife.com/wp-content/uploads/2025/06/KCC-Logo-300x161.webp",href:"https://kcc-holdings.com/"}],"siteConfig",0,c],43213);let g={hero:{tagline:c.tagline,titleLines:["We Don't Just Guide —","We Empower You to","Understand Yourself and","Others."],buttonText:c.cta},gallery:{images:e.map((a,b)=>({id:`gallery-${b+1}`,src:a.src,alt:a.alt,tall:a.tall}))},features:{sectionLabel:"Data-driven ecosystem",sectionHeading:"More than just fortune telling, it's a guide for your life.",items:f.map(a=>({id:a.id,title:a.title,description:a.description,icon:a.icon}))},footer:{title:"联系我们",email:"support@kccdigital.com",contactText:"Contact Pending",addressText:"Address Pending",copyright:"© 2035 by 数易赋能",links:d.map(a=>({...a}))},homepageBlocks:[{id:"block-hero",type:"hero"},{id:"block-gallery",type:"gallery"},{id:"block-brand",type:"brand"},{id:"block-app",type:"app-download"},{id:"block-about",type:"about"},{id:"block-features",type:"features"},{id:"block-results",type:"results"},{id:"block-partners",type:"partners"},{id:"block-testimonials",type:"testimonials"},{id:"block-footer",type:"footer"}],pages:[{id:"page-home",title:"Homepage",slug:"/",status:"published",lastUpdated:"2026-08-07"},{id:"page-portfolio",title:"Product Services",slug:"/portfolio",status:"published",lastUpdated:"2026-08-07"},{id:"page-about",title:"About Us",slug:"/about-us",status:"published",lastUpdated:"2026-08-07"},{id:"page-contact",title:"Contact",slug:"/contact-us",status:"published",lastUpdated:"2026-08-07"},{id:"page-shop",title:"Shop",slug:"/shopping",status:"published",lastUpdated:"2026-08-07"}]};var h=a.i(61299);let i=Object.fromEntries(g.features.items.map(a=>[a.id,a.icon])),j="page-home";function k(a){if(!a)return null;let b=(0,h.getDb)().prepare("SELECT content_json FROM cms_page_versions WHERE id = ?").get(a);return b?function(a){try{var b,c;let d;return b=JSON.parse(a),{...g,...b,hero:{...g.hero,...b.hero},gallery:{...g.gallery,...b.gallery,images:b.gallery?.images??g.gallery.images},features:{...g.features,...b.features,items:b.features?.items?.map((a,b)=>{let c,d;return{...g.features.items[b],...a,icon:(c=i[a.id],d=g.features.items[b]?.icon,a.icon?.trim()||c||d||`/icons/ecosystem/${b+1}.png`)}})??g.features.items},footer:{...g.footer,...b.footer,links:b.footer?.links??g.footer.links,copyright:(c=b.footer?.copyright,(d=c?.trim())&&"© 2035 by 数码麒麟"!==d?d:g.footer.copyright)},homepageBlocks:(b.homepageBlocks??g.homepageBlocks).filter(a=>"faq"!==a.type),pages:b.pages??g.pages}}catch{return g}}(b.content_json):null}function l(){return!function(){let a=(0,h.getDb)();if(a.prepare("SELECT id FROM cms_pages WHERE slug = ?").get("/"))return;let c=new Date().toISOString(),d=(0,b.randomUUID)(),e=JSON.stringify(g);a.transaction(()=>{a.prepare(`INSERT INTO cms_pages
          (id, slug, title, template, status, published_version_id, draft_version_id, created_at, updated_at)
         VALUES (?, ?, ?, 'homepage', 'published', ?, NULL, ?, ?)`).run(j,"/","Homepage",d,c,c),a.prepare(`INSERT INTO cms_page_versions
          (id, page_id, version_no, content_json, seo_json, state, created_at)
         VALUES (?, ?, 1, ?, NULL, 'published', ?)`).run(d,j,e,c)})()}(),(0,h.getDb)().prepare("SELECT id, published_version_id, draft_version_id FROM cms_pages WHERE slug = ?").get("/")}function m(){return k(l().published_version_id)??g}a.s(["getPreviewContent",0,function(){return k(l().draft_version_id)??m()},"getPublishedContent",0,m],55101)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1rd--q-._.js.map