import type { LocaleContentPack } from "../types";

export const zhPack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "行程规划",
    Style: "旅行风格",
    Activities: "活动体验",
  },
  guides: {
    "first-time-fiji": {
      title: "斐济初访指南",
      excerpt: "首次斐济之旅所需了解的一切。",
      category: "行程规划",
      overview:
        "斐济是理想的首次目的地——入境便捷、人民热情，333 座岛屿等待探索。大多数访客无需签证，最多可停留四个月。",
      sections: [
        {
          title: "出发前",
          body: "确保护照在旅行结束后仍有效六个月。购买全面旅行保险，并为偏远岛屿下载离线地图。",
          items: ["护照有效期", "旅行保险", "货币（FJD）", "村庄得体着装"],
        },
        {
          title: "抵达与海关",
          body: "Nadi 国际机场现代化且高效。提前安排私人接送，跳过排队，即刻开始放松。",
          items: ["私人接送", "机场 SIM 卡", "度假村迎宾服务"],
        },
        {
          title: "岛屿礼仪",
          body: "斐济人是世界上最热情好客的民族之一。一声友好的「Bula！」能拉近距离。在村庄请脱帽，受邀时务必接受 kava。",
          items: ["村庄着装规范", "Kava 仪式", "拍照需征得同意"],
        },
      ],
      faqs: [
        {
          question: "斐济初访应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    "visa-guide": {
      title: "签证与入境要求",
      excerpt: "护照、签证与入境规定——简明说明。",
      category: "行程规划",
      overview:
        "大多数旅客飞往斐济前无需办理签证。只需确保护照与返程机票符合移民局要求。",
      sections: [
        {
          title: "免签入境",
          body: "多数国家公民可获最长四个月的访客许可。",
          items: ["有效护照 6 个月以上", "返程机票", "住宿证明"],
        },
      ],
      faqs: [
        {
          question: "签证与入境事宜应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    "best-time-to-visit": {
      title: "斐济最佳旅行时间",
      excerpt: "天气、季节与我们实际推荐的出行时段。",
      category: "行程规划",
      overview:
        "斐济全年温暖。旱季（五月至十月）天空更晴朗、度假村更繁忙；雨季（十一月至四月）绿意盎然、人流较少、价格更优。",
      sections: [
        {
          title: "旱季（五月至十月）",
          body: "湿度较低，潜水和帆船条件极佳。热门——请尽早预订。",
          items: ["最适合潜水", "度假村旺季价格", "节庆与活动"],
        },
        {
          title: "雨季（十一月至四月）",
          body: "更暖，午后偶有阵雨。内陆葱郁、海滩宁静、优惠更多。",
          items: ["更低价格", "葱郁瀑布", "温暖海水"],
        },
      ],
      faqs: [
        {
          question: "最佳旅行时间应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    "weather-guide": {
      title: "天气与气候",
      excerpt: "了解斐济的热带季节。",
      category: "行程规划",
      overview:
        "斐济位于南太平洋信风带——温暖、湿润，全年多数时间阳光充足。",
      sections: [
        {
          title: "区域差异",
          body: "西部（Denarau、Mamanuca）比 Suva 和 Taveuni 更干燥。跳岛行程请考虑微气候差异。",
          items: ["西海岸更干燥", "Suva 更湿润", "飓风季十一月至四月"],
        },
      ],
      faqs: [
        {
          question: "斐济天气应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    "luxury-travel": {
      title: "奢华旅行指南",
      excerpt: "独家度假村与精选体验。",
      category: "旅行风格",
      overview:
        "斐济奢华层级可媲美南太平洋任何目的地——私人岛屿、水上 bure、私人管家与直升机接送皆为标配。",
      sections: [
        {
          title: "住宿推荐",
          body: "Likuliku Lagoon、Turtle Island、Vomo Island 与 Kokomo Private Island 代表巅峰之选。",
          items: ["水上 bure", "私人岛屿", "全包套餐"],
        },
      ],
      faqs: [
        {
          question: "斐济奢华之旅应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    honeymoon: {
      title: "蜜月指南",
      excerpt: "情侣浪漫逃逸。",
      category: "旅行风格",
      overview:
        "斐济是南太平洋最浪漫的目的地——沙洲私人晚宴、情侣 spa 仪式与成人专属岛屿静修。",
      sections: [
        {
          title: "顶级浪漫体验",
          body: "日落帆船、私人岛屿野餐与水上用餐定义斐济蜜月。",
          items: ["私人岛屿住宿", "情侣 spa", "日落巡航"],
        },
      ],
      faqs: [
        {
          question: "斐济蜜月应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    "family-travel": {
      title: "家庭旅行指南",
      excerpt: "带孩子游斐济——轻松天堂。",
      category: "旅行风格",
      overview:
        "斐济文化以儿童为荣。儿童俱乐部、浅潟湖与 bure 式家庭别墅，使斐济成为多代同游的理想之选。",
      sections: [
        {
          title: "亲子友好度假村",
          body: "Denarau 与 Coral Coast 度假村擅长儿童项目，父母可安心享受 spa 时光。",
          items: ["儿童俱乐部", "浅潟湖", "连通房"],
        },
      ],
      faqs: [
        {
          question: "斐济家庭旅行应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    adventure: {
      title: "冒险指南",
      excerpt: "肾上腺素与探索。",
      category: "旅行风格",
      overview:
        "从 Beqa 潟湖鲨鱼潜水到 Taveuni 瀑布徒步，斐济提供世界级冒险而不牺牲奢华。",
      sections: [
        {
          title: "必体验冒险",
          body: "鲨鱼潜水、白水漂流、滑索与冲浪包船位列太平洋最佳之列。",
          items: ["鲨鱼潜水", "漂流", "瀑布徒步"],
        },
      ],
      faqs: [
        {
          question: "斐济冒险之旅应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    wellness: {
      title: "康养指南",
      excerpt: "在天堂恢复身心。",
      category: "旅行风格",
      overview:
        "海景瑜伽、传统 Bobo 按摩与数字排毒静修，使斐济成为新兴的康养目的地。",
      sections: [
        {
          title: "康养仪式",
          body: "结合 spa 护理、森林浴与礁岩冥想，实现全面焕新。",
          items: ["海景 spa", "瑜伽静修", "排毒项目"],
        },
      ],
      faqs: [
        {
          question: "斐济康养之旅应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    culture: {
      title: "文化指南",
      excerpt: "正宗斐济传统。",
      category: "旅行风格",
      overview:
        "斐济文化鲜活而慷慨——村庄探访、meke 舞蹈与 kava 仪式，提供超越度假村围墙的真实连接。",
      sections: [
        {
          title: "文化体验",
          body: "务必随维护村庄关系的向导同行，确保尊重地参与。",
          items: ["村庄游览", "Meke 表演", "手工艺工坊"],
        },
      ],
      faqs: [
        {
          question: "斐济文化体验应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    "food-drink": {
      title: "美食指南",
      excerpt: "斐济吃什么、喝什么。",
      category: "旅行风格",
      overview:
        "斐济美食融合岛屿烹饪与印中风味——从地炉 lovo 盛宴到度假村精致品鉴菜单。",
      sections: [
        {
          title: "必尝",
          body: "Kokoda、lovo、roti 卷与度假村优质餐厅的漫长午餐。",
          items: ["Lovo 盛宴", "Kokoda", "度假村品鉴"],
        },
      ],
      faqs: [
        {
          question: "斐济美食之旅应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    transportation: {
      title: "交通指南",
      excerpt: "航班、渡轮与岛屿间交通。",
      category: "行程规划",
      overview:
        "旅程本身即乐趣——水上飞机、快艇与国内航班比想象中更快连接各岛。",
      sections: [
        {
          title: "岛际交通",
          body: "Denarau Marina 运营至 Mamanuca 与 Yasawa 的渡轮。水上飞机可达偏远奢华目的地。",
          items: ["Fiji Airways 国内线", "Yasawa Flyer", "水上飞机接送"],
        },
      ],
      faqs: [
        {
          question: "斐济交通应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    "island-hopping": {
      title: "跳岛指南",
      excerpt: "轻松串联各岛，无需头疼。",
      category: "行程规划",
      overview:
        "跳岛是斐济的强项。我们规划 Mamanuca、Yasawa 及更安静站点的路线——围绕您的日期与预算定制。",
      sections: [
        {
          title: "示例路线",
          body: "Mamanuca 三天、Yasawa 一周，或十天两者结合——皆可灵活调整。",
          items: ["3 天速览", "7 天探索", "10 天终极"],
        },
      ],
      faqs: [
        {
          question: "斐济跳岛应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    diving: {
      title: "潜水指南",
      excerpt: "珊瑚礁、鲨鱼与世界级潜点。",
      category: "活动体验",
      overview:
        "Rainbow Reef、Beqa Lagoon 与 Great White Wall 位列全球最佳潜水地。",
      sections: [
        {
          title: "顶级潜点",
          body: "Beqa 鲨鱼潜水、Rainbow Reef 与 Namena——适合各水平。",
          items: ["Beqa 鲨鱼", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "斐济潜水应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    surfing: {
      title: "冲浪指南",
      excerpt: "人人谈论的浪点。",
      category: "活动体验",
      overview:
        "Cloudbreak、Restaurants 与 Frigates——专业级浪点，通常从 Denarau 或 Mamanuca 乘船抵达。",
      sections: [
        {
          title: "顶级浪点",
          body: "Cloudbreak 是斐济著名的左手浪。从附近度假村包船，黎明时段出海。",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "斐济冲浪应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
    "travel-planning": {
      title: "旅行规划中心",
      excerpt: "规划完美斐济逃逸的中央枢纽。",
      category: "行程规划",
      overview:
        "一站式资源——指南、工具、礼宾支持与奢华斐济之旅的定制行程设计。",
      sections: [
        {
          title: "从这里开始",
          body: "告知日期、风格与预算——礼宾团队 24 小时内为您定制行程。",
          items: ["免费咨询", "定制行程", "最优价格保证"],
        },
      ],
      faqs: [
        {
          question: "斐济逃逸应提前多久规划？",
          answer:
            "旺季（六月至九月）豪华度假村很快订满。建议提前 3–6 个月预订——我们往往仍能在最后一刻找到合作酒店空房。",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "金色海滩与正宗斐济文化",
      overview:
        "Coral Coast 沿 Viti Levu 南岸延伸——棕榈海滩、奢华度假村与传统村庄交织，火走仪式与 kava 仪式仍塑造日常生活。",
      highlights: ["Sigatoka 沙丘", "村庄仪式", "奢华海滩度假村"],
      thingsToDo: ["村庄游览", "河上探险", "冠军球场高尔夫", "Spa 静修"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "私人海滩别墅"],
      tours: ["文化沉浸一日", "海岸直升机飞行", "日落 dhow 巡航"],
      beaches: ["Natadola 海滩", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["海滨精致餐饮", "Lovo 盛宴", "度假村品鉴菜单"],
      transport: ["Nadi 机场 1 小时", "度假村私人接送", "海岸风景驾车"],
      culture: ["Meke 表演", "陶艺村庄", "传统手工艺市场"],
      weather: "全年温暖。旱季五月至十月（26–30°C）。雨季十一月至四月，午后阵雨。",
      faqs: [
        {
          question: "Coral Coast 最佳访问时间？",
          answer:
            "五月至十月干燥晴朗，适合海滩与水上活动。十一月至四月更暖、绿意更浓，豪华度假村人流较少。",
        },
        {
          question: "如何前往 Coral Coast？",
          answer:
            "国际航班抵达 Nadi 国际机场。私人接送、水上飞机与度假村船只数小时内可达最终目的地。",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "斐济群岛门户",
      overview:
        "Nadi 是进入天堂的抵达点——活力枢纽，连接国际旅客与 Mamanuca、Yasawa 群岛、Denarau Marina 及斐济高地内陆。",
      highlights: ["Sri Siva Subramaniya 神庙", "Garden of the Sleeping Giant", "Denarau Marina"],
      thingsToDo: ["岛屿一日游", "神庙参观", "市场游览", "高尔夫"],
      placesToStay: ["Denarau 度假村", "Nadi 精品酒店", "机场中转 lodge"],
      tours: ["Mamanuca 日航", "Sabeto 泥浴与温泉", "高地村庄游"],
      beaches: ["Denarau 海滩", "Wailoaloa 海滩"],
      dining: ["印斐融合菜", "度假村餐厅", "本地市场食材"],
      transport: ["Nadi 国际机场", "Denarau 渡轮码头", "直升机接送"],
      culture: ["印度教神庙建筑", "多元文化市场", "斐济手工艺中心"],
      weather: "热带湿润。五月至十月跳岛能见度最佳。",
      faqs: [
        {
          question: "Nadi 最佳访问时间？",
          answer:
            "五月至十月干燥晴朗，适合海滩与水上活动。十一月至四月更暖、绿意更浓，豪华度假村人流较少。",
        },
        {
          question: "如何前往 Nadi？",
          answer:
            "国际航班抵达 Nadi 国际机场。私人接送、水上飞机与度假村船只数小时内可达最终目的地。",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "奢华 marina 与世界级度假村",
      overview:
        "Denarau Island 是斐济顶级奢华地址——五星级度假村、冠军高尔夫、精致餐饮及前往 Mamanuca 与 Yasawa 巡航的主要出发点。",
      highlights: ["Port Denarau Marina", "冠军高尔夫", "奢华购物"],
      thingsToDo: ["日落巡航", "摩托艇探险", "Spa 仪式", "跳岛"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "私人住宅"],
      tours: ["私人游艇包租", "直升机岛屿游", "高尔夫与 spa 套餐"],
      beaches: ["Denarau 海滩", "度假村 lagoon 泳池"],
      dining: ["Ports O' Call", "Nuku 餐厅", "Beach club 餐饮"],
      transport: ["距 Nadi 机场 10 分钟", "Marina 渡轮", "私人用车"],
      culture: ["度假村 meke 之夜", "手工艺市场", "斐济烹饪课"],
      weather: "西海岸受保护——比 Suva 干燥。五月至十月理想。",
      faqs: [
        {
          question: "Denarau 最佳访问时间？",
          answer:
            "五月至十月干燥晴朗，适合海滩与水上活动。十一月至四月更暖、绿意更浓，豪华度假村人流较少。",
        },
        {
          question: "如何前往 Denarau？",
          answer:
            "国际航班抵达 Nadi 国际机场。私人接送、水上飞机与度假村船只数小时内可达最终目的地。",
        },
      ],
    },
    mamanuca: {
      title: "Mamanuca 群岛",
      tagline: "荒岛天堂与水晶潟湖",
      overview:
        "Mamanuca 群是斐济最具标志性的岛链——碧色潟湖、赤脚奢华与无数热带梦境的拍摄地，从 Denarau 乘水上飞机或快艇可达。",
      highlights: ["Castaway Island", "Cloud 9 浮动酒吧", "世界级浮潜"],
      thingsToDo: ["浮潜", "Cloudbreak 冲浪", "皮划艇", "私人野餐"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["浮潜之旅", "日落帆船", "水肺体验潜"],
      beaches: ["Monuriki 海滩", "Modriki 岛", "度假村私人海滩"],
      dining: ["水上用餐", "海滩 BBQ", "浮动酒吧体验"],
      transport: ["Denarau 快艇", "水上飞机接送", "度假村私人船只"],
      culture: ["度假村文化之夜", "邻近岛屿村庄探访"],
      weather: "信风降温。旱季水质清澈理想。",
      faqs: [
        {
          question: "Mamanuca 群岛最佳访问时间？",
          answer:
            "五月至十月干燥晴朗，适合海滩与水上活动。十一月至四月更暖、绿意更浓，豪华度假村人流较少。",
        },
        {
          question: "如何前往 Mamanuca 群岛？",
          answer:
            "国际航班抵达 Nadi 国际机场。私人接送、水上飞机与度假村船只数小时内可达最终目的地。",
        },
      ],
    },
    yasawa: {
      title: "Yasawa 群岛",
      tagline: "偏远岛屿与原始之美",
      overview:
        "Yasawa 群岛呈现斐济最原始浪漫的一面——壮观火山峰、蓝洞洞穴、无人海滩及南太平洋最专属的生态奢华静修。",
      highlights: ["Sawa-i-Lau 洞穴", "Blue Lagoon", "偏远奢华 lodge"],
      thingsToDo: ["洞穴游泳", "村庄民宿", "徒步", "潜水"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "赤脚奢华 lodge"],
      tours: ["Blue Lagoon 一日游", "洞穴探险", "多岛帆船"],
      beaches: ["Octopus Beach", "Nanuya Levu", "度假村私人海湾"],
      dining: ["海滩盛宴", "度假村品鉴", "当日渔获 BBQ"],
      transport: ["Yasawa Flyer 渡轮", "水上飞机", "私人游艇"],
      culture: ["偏远村庄探访", "传统捕鱼", "讲故事之夜"],
      weather: "比本土干燥。六月至九月能见度最佳。",
      faqs: [
        {
          question: "Yasawa 群岛最佳访问时间？",
          answer:
            "五月至十月干燥晴朗，适合海滩与水上活动。十一月至四月更暖、绿意更浓，豪华度假村人流较少。",
        },
        {
          question: "如何前往 Yasawa 群岛？",
          answer:
            "国际航班抵达 Nadi 国际机场。私人接送、水上飞机与度假村船只数小时内可达最终目的地。",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "花园岛与瀑布之乡",
      overview:
        "被誉为花园岛，Taveuni 是联合国教科文组织丰富的雨林、瀑布与世界著名潜点天堂——适合寻求度假村路线之外自然的冒险者与情侣。",
      highlights: ["Bouma 国家遗产公园", "Rainbow Reef 潜水", "Tavoro 瀑布"],
      thingsToDo: ["瀑布徒步", "水肺潜水", "观鸟", "皮划艇"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "生态 lodge"],
      tours: ["Bouma Falls 徒步", "Rainbow Reef 潜水", "Lavena Coastal Walk"],
      beaches: ["Lavena 海滩", "Matei 海滩", "隐秘海湾"],
      dining: ["种植园风格餐饮", "新鲜热带农产品", "度假村融合菜单"],
      transport: ["Nadi/Suva 国内航班", "度假村接送", "包船"],
      culture: ["Wainibau 村庄", "传统 taro 农场", "本地手工艺"],
      weather: "最湿润区域——全年葱郁。潜水最佳四月至十月。",
      faqs: [
        {
          question: "Taveuni 最佳访问时间？",
          answer:
            "五月至十月干燥晴朗，适合海滩与水上活动。十一月至四月更暖、绿意更浓，豪华度假村人流较少。",
        },
        {
          question: "如何前往 Taveuni？",
          answer:
            "国际航班抵达 Nadi 国际机场。私人接送、水上飞机与度假村船只数小时内可达最终目的地。",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "斐济冒险之都",
      overview:
        "Pacific Harbour 是斐济的极限冒险目的地——Beqa Lagoon 鲨鱼潜水、白水漂流、滑索与俯瞰太平洋的奢华别墅，皆在 Suva 可达范围内。",
      highlights: ["鲨鱼潜水", "白水漂流", "Zip Fiji"],
      thingsToDo: ["鲨鱼喂食潜水", "Upper Navua 漂流", "高尔夫", "深海钓鱼"],
      placesToStay: ["The Pearl South Pacific", "奢华别墅", "精品 lodge"],
      tours: ["Beqa 鲨鱼邂逅", "漂流一日", "钓鱼包船"],
      beaches: ["Natadola（附近）", "隐秘海湾", "度假村海滩"],
      dining: ["Marina 餐厅", "度假村精致餐饮", "本地海鲜"],
      transport: ["距 Nadi 2.5 小时", "距 Suva 45 分钟", "可直升机"],
      culture: ["Beqa 火走", "村庄表演", "手工艺市场"],
      weather: "比西海岸略湿。全年冒险运动。",
      faqs: [
        {
          question: "Pacific Harbour 最佳访问时间？",
          answer:
            "五月至十月干燥晴朗，适合海滩与水上活动。十一月至四月更暖、绿意更浓，豪华度假村人流较少。",
        },
        {
          question: "如何前往 Pacific Harbour？",
          answer:
            "国际航班抵达 Nadi 国际机场。私人接送、水上飞机与度假村船只数小时内可达最终目的地。",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "文化与商业之都",
      overview:
        "Suva 是现代斐济跳动的心脏——殖民建筑、活力市场、博物馆与日益增长的精致餐饮场景，适合先文化后海滩的旅客。",
      highlights: ["斐济博物馆", "市政市场", "议会与 Thurston Gardens"],
      thingsToDo: ["市场游览", "博物馆参观", "殖民漫步", "夜生活"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "精品城市酒店"],
      tours: ["城市遗产漫步", "Colo-i-Suva 森林游泳", "高地一日游"],
      beaches: ["无城市海滩——可日游 Pacific Harbour"],
      dining: ["精致餐饮", "印度街头小吃", "海鲜市场"],
      transport: ["Nausori 国际机场", "巴士至 Coral Coast", "国内航班"],
      culture: ["斐济、印度与中国文化遗产", "现场音乐", "艺术画廊"],
      weather: "最湿润的主要城市。全年备轻便雨具。",
      faqs: [
        {
          question: "Suva 最佳访问时间？",
          answer:
            "五月至十月干燥晴朗，适合海滩与水上活动。十一月至四月更暖、绿意更浓，豪华度假村人流较少。",
        },
        {
          question: "如何前往 Suva？",
          answer:
            "国际航班抵达 Nadi 国际机场。私人接送、水上飞机与度假村船只数小时内可达最终目的地。",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "水晶水域浮潜",
      category: "水上",
      duration: "半天",
      ages: "所有年龄",
      overview:
        "在 Mamanuca 最清澈潟湖的七彩珊瑚花园上滑行，配备私人向导、高级装备与无人沙洲香槟野餐。",
      highlights: ["私人向导", "高级浮潜装备", "香槟野餐", "海洋生物学家讲解"],
      included: ["往返船接送", "浮潜装备", "茶点", "海洋公园费用"],
      itinerary: ["Denarau marina 出发", "两个浮潜点", "沙洲野餐", "日落巡航返回"],
      faqs: [
        { question: "需要经验吗？", answer: "不需要——适合有基本游泳能力的新手。" },
        { question: "应带什么？", answer: "reef-safe 防晒霜、泳装与轻便外搭。" },
      ],
    },
    "sunset-cruises": {
      title: "日落巡航",
      category: "帆船",
      duration: "2–3 小时",
      ages: "所有年龄",
      overview:
        "乘豪华双体船驶向金色太平洋日落，享用小食、高级饮品与现场斐济吉他，Mamanuca 轮廓渐入暮色。",
      highlights: ["豪华双体船", "小食与饮品", "现场音乐", "360° 日落景观"],
      included: ["欢迎饮品", "小食精选", "可选返程接送"],
      itinerary: ["Marina 登船", "海岸航行", "日落祝酒", "星空下返回"],
      faqs: [
        {
          question: "是否受天气影响？",
          answer: "多数条件下运营；因安全取消则全额退款。",
        },
      ],
    },
    "hiking-waterfalls": {
      title: "徒步与瀑布",
      category: "冒险",
      duration: "全天",
      ages: "16+",
      overview:
        "穿越 Bouma 国家遗产公园至隐秘瀑布，在翡翠色泳池游泳，于花园岛原始雨林享用热带水果午餐。",
      highlights: ["专业本地向导", "三处瀑布游泳", "雨林生态", "农场到餐桌午餐"],
      included: ["公园费用", "向导", "午餐", "度假村接送"],
      itinerary: ["晨间森林徒步", "瀑布游泳", "村庄午餐", "下午返回"],
      faqs: [
        {
          question: "体能要求？",
          answer: "中等——4–5 小时崎岖步道，部分陡峭路段。",
        },
      ],
    },
    "village-tours": {
      title: "村庄游览",
      category: "文化",
      duration: "半天",
      ages: "所有年龄",
      overview:
        "体验正宗斐济好客——kava 仪式、meke 舞蹈、手工艺演示与村长家族准备的传统 lovo 盛宴。",
      highlights: ["Kava 仪式", "Meke 表演", "Lovo 盛宴", "手工艺工坊"],
      included: ["村庄捐赠", "仪式参与", "传统午餐", "交通"],
      itinerary: ["村庄欢迎", "Kava 与 meke", "手工艺演示", "Lovo 午餐"],
      faqs: [
        {
          question: "应穿什么？",
          answer: "得体着装覆盖肩膝。村庄内请脱帽。",
        },
      ],
    },
    "island-hopping": {
      title: "跳岛冒险",
      category: "多日",
      duration: "3–7 天",
      ages: "所有年龄",
      overview:
        "私人快艇或水上飞机精心策划的多岛之旅——精品度假村、隐秘海滩与礼宾定制的专属体验。",
      highlights: ["私人接送", "精品度假村住宿", "灵活行程", "专属礼宾"],
      included: ["岛际接送", "度假村协调", "每日早餐", "礼宾支持"],
      itinerary: ["第 1 天：Mamanuca 抵达", "第 2–3 天：Yasawa 探索", "第 4 天+：定制延长"],
      faqs: [
        {
          question: "可以定制吗？",
          answer: "每次跳岛皆量身定制——礼宾与您共同设计路线。",
        },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Denarau Island 度假村套餐",
      description: "五晚海景套房，含私人机场接送、每日早餐与 marina 使用权。",
      includes: ["私人接送", "海景套房", "每日早餐"],
    },
    "romantic-honeymoon-escape": {
      title: "浪漫蜜月逃逸",
      description: "情侣静修含沙洲私人晚宴、情侣 spa 仪式与日落帆船。",
      includes: ["私人晚宴", "情侣 spa", "日落巡航"],
    },
    "mamanuca-island-escape": {
      title: "Mamanuca 岛屿逃逸",
      description: "轻松度假套餐——往返水上飞机、水上午餐与浮潜装备。",
      includes: ["水上飞机接送", "度假村额度", "浮潜租赁"],
    },
    "family-coral-coast-package": {
      title: "Coral Coast 家庭套餐",
      description: "连通 bure、儿童俱乐部使用权与 Natadola 海滩全家活动。",
      includes: ["儿童俱乐部", "家庭 bure", "海滩活动"],
    },
    "private-island-buyout": {
      title: "私人岛屿包岛",
      description: "Mamanuca 岛屿专属使用——最多 12 位宾客，含厨师、船只与管家团队。",
      includes: ["专属岛屿", "私人厨师", "包船"],
    },
    "stay-and-play-nadi": {
      title: "Stay & Play Nadi 套餐",
      description: "度假村住宿搭配精选一日游——村庄探访、泥浴与岛屿野餐。",
      includes: ["度假村住宿", "2 次一日游", "全部接送"],
    },
    "luxury-overwater-bure": {
      title: "奢华水上 bure 住宿",
      description: "睡于水晶水域之上——私人露台、管家服务与 bure 内用餐。",
      includes: ["水上 bure", "管家服务", "Bure 内用餐"],
    },
    "coral-coast-beach-escape": {
      title: "Coral Coast 海滩逃逸",
      description: "Natadola 海滩度假村含 FJD 200 spa 额度与精选品鉴晚宴。",
      includes: ["海滨客房", "Spa 额度", "品鉴晚宴"],
    },
    "wellness-spa-retreat": {
      title: "康养 Spa 静修",
      description: "海景瑜伽、传统 Bobo 按摩与有机农场到餐桌餐饮。",
      includes: ["每日瑜伽", "Spa 仪式", "康养餐饮"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description: "斐济唯一水上 bure——成人专属静修，全包餐饮。",
      includes: ["水上 bure", "全包", "仅限成人"],
    },
    "mamanuca-island-hopping": {
      title: "Mamanuca 跳岛",
      description: "私人快艇、礁区浮潜与无人沙洲香槟野餐。",
      includes: ["私人船只", "浮潜", "香槟野餐"],
    },
    "yasawa-adventure-package": {
      title: "Yasawa 冒险套餐",
      description: "向导徒步至隐秘瀑布、海上皮划艇与村庄 kava 仪式。",
      includes: ["瀑布徒步", "皮划艇", "村庄探访"],
    },
    "beqa-shark-dive": {
      title: "Beqa Lagoon 鲨鱼潜水",
      description: "世界著名鲨鱼邂逅，含装备、向导与 Pacific Harbour 度假村接送。",
      includes: ["鲨鱼潜水", "装备", "接送"],
    },
    "sunset-cruise-denarau": {
      title: "私人日落巡航",
      description: "Port Denarau Marina 香槟帆船——小食、现场音乐与黄金时段景观。",
      includes: ["私人包租", "小食", "香槟"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "斐济唯一拥有水上 bure 的度假村——Likuliku 将成人专属私密与世界级餐饮及日落时闪耀的潟湖完美结合。",
      amenities: ["水上 bure", "仅限成人", "Spa", "私人海滩", "精致餐饮"],
      experiences: ["浮潜", "日落巡航", "Spa 仪式"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "精致私密的 36 间 bure 岛屿，赤脚奢华与斐济热情相遇——蜜月与里程碑庆典的理想之选。",
      amenities: ["海滨 bure", "Spa", "潜水中心", "私人用餐"],
      experiences: ["潜水", "岛屿野餐", "村庄探访"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "Denarau 旗舰亲子奢华——开阔泳池、冠军高尔夫毗邻与无缝 marina 跳岛冒险通道。",
      amenities: ["多座泳池", "儿童俱乐部", "Spa", "Marina 通道", "7 家餐厅"],
      experiences: ["跳岛", "高尔夫", "日落巡航"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Denarau 最佳海滩上的法式精致奢华——漂浮早餐、礁区浮潜与 Sofitel 招牌 spa 哲学。",
      amenities: ["海滨", "Spa", "礁区浮潜", "儿童俱乐部"],
      experiences: ["礁区浮潜", "Spa 日", "文化之夜"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "Natadola 海滩明珠——冠军高尔夫、Natadola 传奇沙质与门外村庄文化。",
      amenities: ["Natadola 海滩", "高尔夫球场", "Spa", "儿童俱乐部", "文化中心"],
      experiences: ["村庄游览", "高尔夫", "海滩骑马"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "定义一代人斐济印象的岛屿——亲子友好、环礁环绕、自然真实。",
      amenities: ["私人岛屿", "PADI 中心", "儿童俱乐部", "多片海滩"],
      experiences: ["浮潜", "皮划艇", "村庄探访"],
    },
  },
};
