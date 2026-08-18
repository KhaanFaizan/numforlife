module.exports=[85148,(a,b,c)=>{b.exports=a.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},66680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},2157,(a,b,c)=>{b.exports=a.x("node:fs",()=>require("node:fs"))},50227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},67872,a=>{"use strict";var b=a.i(66680),c=a.i(43213);let d={hero:{tagline:c.siteConfig.tagline,titleLines:["We Don't Just Guide —","We Empower You to","Understand Yourself and","Others."],buttonText:c.siteConfig.cta},gallery:{images:c.galleryImages.map((a,b)=>({id:`gallery-${b+1}`,src:a.src,alt:a.alt,tall:a.tall}))},features:{sectionLabel:"Data-driven ecosystem",sectionHeading:"More than just fortune telling, it's a guide for your life.",items:c.ecosystemFeatures.map(a=>({id:a.id,title:a.title,description:a.description,icon:a.icon}))},footer:{title:"联系我们",email:"support@kccdigital.com",contactText:"Contact Pending",addressText:"Address Pending",copyright:"© 2035 by 数易赋能",links:c.footerLinks.map(a=>({...a}))},homepageBlocks:[{id:"block-hero",type:"hero"},{id:"block-gallery",type:"gallery"},{id:"block-brand",type:"brand"},{id:"block-app",type:"app-download"},{id:"block-about",type:"about"},{id:"block-features",type:"features"},{id:"block-results",type:"results"},{id:"block-partners",type:"partners"},{id:"block-testimonials",type:"testimonials"},{id:"block-footer",type:"footer"}],pages:[{id:"page-home",title:"Homepage",slug:"/",status:"published",lastUpdated:"2026-08-07"},{id:"page-portfolio",title:"Product Services",slug:"/portfolio",status:"published",lastUpdated:"2026-08-07"},{id:"page-about",title:"About Us",slug:"/about-us",status:"published",lastUpdated:"2026-08-07"},{id:"page-contact",title:"Contact",slug:"/contact-us",status:"published",lastUpdated:"2026-08-07"},{id:"page-shop",title:"Shop",slug:"/shopping",status:"published",lastUpdated:"2026-08-07"}]};var e=a.i(61299);let f=Object.fromEntries(d.features.items.map(a=>[a.id,a.icon])),g="page-home";async function h(){return function(a){if(!a)return null;let b=(0,e.getDb)().prepare("SELECT content_json FROM cms_page_versions WHERE id = ?").get(a);return b?function(a){try{var b,c;let e;return b=JSON.parse(a),{...d,...b,hero:{...d.hero,...b.hero},gallery:{...d.gallery,...b.gallery,images:b.gallery?.images??d.gallery.images},features:{...d.features,...b.features,items:b.features?.items?.map((a,b)=>{let c,e;return{...d.features.items[b],...a,icon:(c=f[a.id],e=d.features.items[b]?.icon,a.icon?.trim()||c||e||`/icons/ecosystem/${b+1}.png`)}})??d.features.items},footer:{...d.footer,...b.footer,links:b.footer?.links??d.footer.links,copyright:(c=b.footer?.copyright,(e=c?.trim())&&"© 2035 by 数码麒麟"!==e?e:d.footer.copyright)},homepageBlocks:(b.homepageBlocks??d.homepageBlocks).filter(a=>"faq"!==a.type),pages:b.pages??d.pages}}catch{return d}}(b.content_json):null}((!function(){let a=(0,e.getDb)();if(a.prepare("SELECT id FROM cms_pages WHERE slug = ?").get("/"))return;let c=new Date().toISOString(),f=(0,b.randomUUID)(),h=JSON.stringify(d);a.transaction(()=>{a.prepare(`INSERT INTO cms_pages
          (id, slug, title, template, status, published_version_id, draft_version_id, created_at, updated_at)
         VALUES (?, ?, ?, 'homepage', 'published', ?, NULL, ?, ?)`).run(g,"/","Homepage",f,c,c),a.prepare(`INSERT INTO cms_page_versions
          (id, page_id, version_no, content_json, seo_json, state, created_at)
         VALUES (?, ?, 1, ?, NULL, 'published', ?)`).run(f,g,h,c)})()}(),(0,e.getDb)().prepare("SELECT id, published_version_id, draft_version_id FROM cms_pages WHERE slug = ?").get("/")).published_version_id)??d}a.s(["getPublishedContent",0,h],67872)},43213,a=>{"use strict";a.s(["aboutBio",0,{paragraphs:["千寓为数字生命学的资深老师，现居住美国与马来西亚两地。作为一个数字生命学的倡导者，她相信人可以透过自身的努力去改变命运，好的名字与数字组合会为人生带来辅助。数字本无好坏之分，皆在与我们如何透过自身的能量去驾驭属于我们的生命密码。","俯宏为NLP高级导师（ABNLP与NLPU认证），催眠咨询与治疗师(ABH与NGH认证）与臼井与慈光灵气导师。他因千寓而认识了数字生命学。并希望结合自身经历与学问，协助，帮助有需要的人去达成目标。"],image:"https://numforlife.com/wp-content/uploads/2025/06/Zodiac-Clock-Detail-1.avif"},"aboutPartnerLogos",0,[{name:"SKKER",logo:"https://numforlife.com/wp-content/uploads/2025/06/Logo-1-1-150x150.png",href:"https://numforlife.com/wp-content/uploads/2025/06/Logo-1-1-scaled.png"},{name:"Inner Pattern",logo:"https://numforlife.com/wp-content/uploads/2025/06/Inner-Pattern-Logo-2.png",href:"https://numforlife.com/wp-content/uploads/2025/06/Inner-Pattern-Logo-2.png"},{name:"KCC Holdings",logo:"https://numforlife.com/wp-content/uploads/2025/06/KCC-Logo-150x150.webp",href:"https://numforlife.com/wp-content/uploads/2025/06/KCC-Logo.webp"}],"aboutTeam",0,{heading:"OUR TEAM",subtitle:"我们是一群热爱东西方命理、玄学与身心灵成长的探索者，希望用我们的指引，点亮你的人生方向。",members:[{name:"郭俯宏 - Weaving Life Code into Wonders",image:"https://numforlife.com/wp-content/uploads/2025/06/GettyImages-638493478-1.avif"},{name:"高千寓 - Ruling the financial realm",image:"https://numforlife.com/wp-content/uploads/2025/06/GettyImages-1317309593.avif"},{name:"蔡子和 - Decoding the code jungle",image:"https://numforlife.com/wp-content/uploads/2025/06/mayagi_Medium_shot_of_a_diverse_smiling_tech_worker_in_portland_9130dee5-b27a-4307-a5d3-75.avif"}]},"ecosystemFeatures",0,[{id:"divination-1",title:"占卜指引",description:"我们提供世界四大占卜指引，兼容多种设备，希望透过不同的学说与学派占卜基础为您全方位解决人生课题。",icon:"/icons/ecosystem/1.png"},{id:"divination-2",title:"占卜指引",description:"我们提供世界四大占卜指引，兼容多种设备，希望透过不同的学说与学派占卜基础为您全方位解决人生课题。",icon:"/icons/ecosystem/2.png"},{id:"knowledge",title:"知识与数据库",description:"我们的系统基于庞大的数据库，并且拥有AI辅助与导师亲自撰写，确保提供更准确的数据。",icon:"/icons/ecosystem/3.png"},{id:"tools",title:"工具",description:"我们严格筛选第三方供应，希望提供品质良好切价格平民的工具来提升您的能量与磁场。​这不是迷信。",icon:"/icons/ecosystem/4.png"},{id:"archive",title:"档案管理",description:"我们提供所有会员档案管理，用户可以对照不同时间点的解读自己与他人现况的变化，从而提升觉知。",icon:"/icons/ecosystem/5.png"},{id:"mentor",title:"导师辅导",description:"我们严格筛选导师，提供一定的认证体系（建立中），以最亲民的价格与方式与你探讨的人生课题。",icon:"/icons/ecosystem/6.png"}],"footerLinks",0,[{label:"常见问题",href:"/faq"},{label:"无障碍声明",href:"/accessibility-statement"},{label:"隐私政策",href:"/privacy-policy"},{label:"使用条款",href:"/terms-of-use"},{label:"退款政策",href:"/refund-policy"},{label:"配送政策",href:"/shipping-policy"}],"galleryImages",0,[{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_0b3b028fa90c4fb9862f1f13c3ac2810mv2.png",alt:"数易赋能展示图 1",tall:!0},{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_e07c2a2eb04f4c3fa61a769470821a8cmv2.jpg",alt:"数易赋能展示图 2",tall:!1},{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_3ce398a3fd4a4b24be4963111688e2f8mv2.png",alt:"数易赋能展示图 3",tall:!0}],"partners",0,[{name:"SKKER",logo:"https://numforlife.com/wp-content/uploads/2025/06/Logo-1-1-300x297.png",href:"http://www.skker.com"},{name:"KCC Holdings",logo:"https://numforlife.com/wp-content/uploads/2025/06/KCC-Logo-300x161.webp",href:"https://kcc-holdings.com/"}],"productServices",0,[{id:"digital-life",title:"Digital Life",image:"https://numforlife.com/wp-content/uploads/2025/06/11062b_0a4cc6bd468f4930924daa97e9cfcce3mv2-1.avif",href:"https://numforlife.com/number"},{id:"onomastics",title:"Onomastics",image:"https://numforlife.com/wp-content/uploads/2025/06/sc1.webp",href:"https://numforlife.com/name"},{id:"tarot",title:"Tarot reading",image:"https://numforlife.com/wp-content/uploads/2025/06/dt1.webp",href:"https://numforlife.com/tarot"},{id:"eastern",title:"Eastern divination",image:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_882b88deaff94da6973cb65bf6ddc250mv2-1.avif",href:"https://numforlife.com/eastern-divination"}],"resultsImages",0,[{src:"https://numforlife.com/wp-content/uploads/2025/06/11062b_0a4cc6bd468f4930924daa97e9cfcce3mv2-1.avif",alt:"成果展示 1"},{src:"https://numforlife.com/wp-content/uploads/2025/06/77a7d0_cec088e711a54093ad46a5ab44ddacf4mv2.avif",alt:"成果展示 2"}],"siteConfig",0,{name:"数易赋能",tagline:"数易赋能，您的人生导航",subtitle:"We Don't Just Guide — We Empower You to Understand Yourself and Others.",cta:"请改变自己吧"}])},10,92814,a=>{"use strict";let b=(process.env.SITE_URL??process.env.NEXT_PUBLIC_SITE_URL??"https://numforlife.com").replace(/\/$/,""),c="数易赋能",d="数易赋能，您的人生导航",e="数易赋能提供数字生命测算、姓名学与东方智慧指引，帮助您更了解自己与他人。网页简版预览，完整体验请下载数易 App。",f="zh_CN",g="https://numforlife.com/wp-content/uploads/2025/06/11062b_0a4cc6bd468f4930924daa97e9cfcce3mv2-1.avif";a.s(["defaultDescription",0,e,"defaultOgImage",0,g,"locale",0,f,"organization",0,{name:c,url:b,email:"support@kccdigital.com",logo:g},"siteName",0,c,"siteTagline",0,d,"siteUrl",0,b],92814),a.s(["buildPageMetadata",0,function({title:a,description:d=e,path:h,noIndex:i=!1,ogImage:j=g}){let k="/"===h?"/":h.replace(/\/$/,""),l=`${b}${"/"===k?"":k}`,m="/"===k?`${c} – ${a}`:`${a} – ${c}`;return{title:m,description:d,alternates:{canonical:l},robots:i?{index:!1,follow:!1}:{index:!0,follow:!0},openGraph:{type:"website",locale:f,url:l,siteName:c,title:m,description:d,images:[{url:j,alt:c}]},twitter:{card:"summary_large_image",title:m,description:d,images:[j]}}},"rootMetadata",0,function(){return{metadataBase:new URL(b),title:{default:`${c} – ${d}`,template:`%s – ${c}`},description:e,applicationName:c,openGraph:{type:"website",locale:f,siteName:c,title:c,description:e,images:[{url:g,alt:c}]},twitter:{card:"summary_large_image",title:c,description:e,images:[g]}}}],10)},85689,61299,a=>{"use strict";var b=a.i(2157),c=a.i(50227),d=a.i(85148);let e=null;function f(){var a;if(e)return e;let f=process.env.CMS_DATABASE_PATH?.trim()||c.default.join(process.cwd(),"data","numforlife_web.sqlite");return b.default.mkdirSync(c.default.dirname(f),{recursive:!0}),(e=new d.default(f)).pragma("journal_mode = WAL"),e.pragma("foreign_keys = ON"),(a=e).exec(`
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
  `),a.prepare("PRAGMA table_info(cms_pages)").all().some(a=>"draft_version_id"===a.name)||a.exec("ALTER TABLE cms_pages ADD COLUMN draft_version_id TEXT"),e}a.s(["getDb",0,f],61299);let g=Object.fromEntries([{key:"maintenance_mode",label:"Maintenance mode",description:"When enabled, show a maintenance notice on public pages (server-rendered).",defaultValue:!1},{key:"shop_enabled",label:"Shop enabled",description:"Controls whether /shop is linked prominently in navigation.",defaultValue:!0},{key:"membership_page_enabled",label:"Membership page enabled",description:"Allows public access to /membership pricing and benefits.",defaultValue:!0},{key:"show_app_download_cta",label:"App download CTAs",description:"Shows App download prompts on the homepage, shop, and membership pages.",defaultValue:!0}].map(a=>[a.key,a.defaultValue]));c.default.join(process.cwd(),"public","site-flags.json"),a.s(["getSiteFlags",0,function(){f().exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      updated_by TEXT
    );
  `);let a=f().prepare("SELECT key, value_json FROM site_settings WHERE key LIKE 'flag:%'").all(),b={...g};for(let c of a){let a=c.key.replace(/^flag:/,"");if(a in b)try{b[a]=!!JSON.parse(c.value_json)}catch{}}return b}],85689)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b5b4lq._.js.map