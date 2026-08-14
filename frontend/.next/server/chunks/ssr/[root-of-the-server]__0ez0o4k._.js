module.exports=[85148,(a,b,c)=>{b.exports=a.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},61299,a=>{"use strict";var b=a.i(2157),c=a.i(50227),d=a.i(85148);let e=c.default.join(process.cwd(),"data","numforlife_web.sqlite"),f=null;a.s(["getDb",0,function(){var a;if(f)return f;let g=process.env.CMS_DATABASE_PATH??e;return b.default.mkdirSync(c.default.dirname(g),{recursive:!0}),(f=new d.default(g)).pragma("journal_mode = WAL"),f.pragma("foreign_keys = ON"),(a=f).exec(`
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
  `),a.prepare("PRAGMA table_info(cms_pages)").all().some(a=>"draft_version_id"===a.name)||a.exec("ALTER TABLE cms_pages ADD COLUMN draft_version_id TEXT"),f}])},66680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},2157,(a,b,c)=>{b.exports=a.x("node:fs",()=>require("node:fs"))},50227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},67872,a=>{"use strict";var b=a.i(66680);let c={hero:{tagline:"数易赋能，您的人生导航",titleLines:["We Don't Just Guide —","We Empower You to","Understand Yourself and","Others."],buttonText:"请改变自己吧"},gallery:{images:[{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_0b3b028fa90c4fb9862f1f13c3ac2810mv2.png",alt:"数易赋能展示图 1",tall:!0},{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_e07c2a2eb04f4c3fa61a769470821a8cmv2.jpg",alt:"数易赋能展示图 2",tall:!1},{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_3ce398a3fd4a4b24be4963111688e2f8mv2.png",alt:"数易赋能展示图 3",tall:!0}].map((a,b)=>({id:`gallery-${b+1}`,src:a.src,alt:a.alt,tall:a.tall}))},features:{sectionLabel:"Data-driven ecosystem",sectionHeading:"More than just fortune telling, it's a guide for your life.",items:[{id:"divination-1",title:"占卜指引",description:"我们提供世界四大占卜指引，兼容多种设备，希望透过不同的学说与学派占卜基础为您全方位解决人生课题。",icon:"/icons/ecosystem/1.png"},{id:"divination-2",title:"占卜指引",description:"我们提供世界四大占卜指引，兼容多种设备，希望透过不同的学说与学派占卜基础为您全方位解决人生课题。",icon:"/icons/ecosystem/2.png"},{id:"knowledge",title:"知识与数据库",description:"我们的系统基于庞大的数据库，并且拥有AI辅助与导师亲自撰写，确保提供更准确的数据。",icon:"/icons/ecosystem/3.png"},{id:"tools",title:"工具",description:"我们严格筛选第三方供应，希望提供品质良好切价格平民的工具来提升您的能量与磁场。​这不是迷信。",icon:"/icons/ecosystem/4.png"},{id:"archive",title:"档案管理",description:"我们提供所有会员档案管理，用户可以对照不同时间点的解读自己与他人现况的变化，从而提升觉知。",icon:"/icons/ecosystem/5.png"},{id:"mentor",title:"导师辅导",description:"我们严格筛选导师，提供一定的认证体系（建立中），以最亲民的价格与方式与你探讨的人生课题。",icon:"/icons/ecosystem/6.png"}].map(a=>({id:a.id,title:a.title,description:a.description,icon:a.icon}))},footer:{title:"联系我们",email:"support@kccdigital.com",contactText:"Contact Pending",addressText:"Address Pending",copyright:"© 2035 by 数码麒麟",links:[{label:"无障碍声明",href:"/accessibility-statement"},{label:"隐私政策",href:"/privacy-policy"},{label:"使用条款",href:"/terms-of-use"},{label:"退款政策",href:"/refund-policy"},{label:"配送政策",href:"/shipping-policy"}].map(a=>({...a}))},homepageBlocks:[{id:"block-hero",type:"hero"},{id:"block-gallery",type:"gallery"},{id:"block-brand",type:"brand"},{id:"block-app",type:"app-download"},{id:"block-about",type:"about"},{id:"block-features",type:"features"},{id:"block-results",type:"results"},{id:"block-partners",type:"partners"},{id:"block-testimonials",type:"testimonials"},{id:"block-footer",type:"footer"}],pages:[{id:"page-home",title:"Homepage",slug:"/",status:"published",lastUpdated:"2026-08-07"},{id:"page-portfolio",title:"Product Services",slug:"/portfolio",status:"published",lastUpdated:"2026-08-07"},{id:"page-about",title:"About Us",slug:"/about-us",status:"published",lastUpdated:"2026-08-07"},{id:"page-contact",title:"Contact",slug:"/contact-us",status:"published",lastUpdated:"2026-08-07"},{id:"page-shop",title:"Shop",slug:"/shopping",status:"published",lastUpdated:"2026-08-07"}]};var d=a.i(61299);let e=Object.fromEntries(c.features.items.map(a=>[a.id,a.icon])),f="page-home";async function g(){return function(a){if(!a)return null;let b=(0,d.getDb)().prepare("SELECT content_json FROM cms_page_versions WHERE id = ?").get(a);return b?function(a){try{var b;return b=JSON.parse(a),{...c,...b,hero:{...c.hero,...b.hero},gallery:{...c.gallery,...b.gallery,images:b.gallery?.images??c.gallery.images},features:{...c.features,...b.features,items:b.features?.items?.map((a,b)=>{let d,f;return{...c.features.items[b],...a,icon:(d=e[a.id],f=c.features.items[b]?.icon,a.icon?.trim()||d||f||`/icons/ecosystem/${b+1}.png`)}})??c.features.items},footer:{...c.footer,...b.footer,links:b.footer?.links??c.footer.links},homepageBlocks:(b.homepageBlocks??c.homepageBlocks).filter(a=>"faq"!==a.type),pages:b.pages??c.pages}}catch{return c}}(b.content_json):null}((!function(){let a=(0,d.getDb)();if(a.prepare("SELECT id FROM cms_pages WHERE slug = ?").get("/"))return;let e=new Date().toISOString(),g=(0,b.randomUUID)(),h=JSON.stringify(c);a.transaction(()=>{a.prepare(`INSERT INTO cms_pages
          (id, slug, title, template, status, published_version_id, draft_version_id, created_at, updated_at)
         VALUES (?, ?, ?, 'homepage', 'published', ?, NULL, ?, ?)`).run(f,"/","Homepage",g,e,e),a.prepare(`INSERT INTO cms_page_versions
          (id, page_id, version_no, content_json, seo_json, state, created_at)
         VALUES (?, ?, 1, ?, NULL, 'published', ?)`).run(g,f,h,e)})()}(),(0,d.getDb)().prepare("SELECT id, published_version_id, draft_version_id FROM cms_pages WHERE slug = ?").get("/")).published_version_id)??c}a.s(["getPublishedContent",0,g],67872)},10,92814,a=>{"use strict";let b=(process.env.SITE_URL??process.env.NEXT_PUBLIC_SITE_URL??"https://numforlife.com").replace(/\/$/,""),c="数易赋能",d="数易赋能，您的人生导航",e="数易赋能提供数字生命测算、姓名学与东方智慧指引，帮助您更了解自己与他人。网页简版预览，完整体验请下载数易 App。",f="zh_CN",g="https://numforlife.com/wp-content/uploads/2025/06/11062b_0a4cc6bd468f4930924daa97e9cfcce3mv2-1.avif";a.s(["defaultDescription",0,e,"defaultOgImage",0,g,"locale",0,f,"organization",0,{name:c,url:b,email:"support@kccdigital.com",logo:g},"siteName",0,c,"siteTagline",0,d,"siteUrl",0,b],92814),a.s(["buildPageMetadata",0,function({title:a,description:d=e,path:h,noIndex:i=!1,ogImage:j=g}){let k="/"===h?"/":h.replace(/\/$/,""),l=`${b}${"/"===k?"":k}`,m="/"===k?`${c} – ${a}`:`${a} – ${c}`;return{title:m,description:d,alternates:{canonical:l},robots:i?{index:!1,follow:!1}:{index:!0,follow:!0},openGraph:{type:"website",locale:f,url:l,siteName:c,title:m,description:d,images:[{url:j,alt:c}]},twitter:{card:"summary_large_image",title:m,description:d,images:[j]}}},"rootMetadata",0,function(){return{metadataBase:new URL(b),title:{default:`${c} – ${d}`,template:`%s – ${c}`},description:e,applicationName:c,openGraph:{type:"website",locale:f,siteName:c,title:c,description:e,images:[{url:g,alt:c}]},twitter:{card:"summary_large_image",title:c,description:e,images:[g]}}}],10)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ez0o4k._.js.map