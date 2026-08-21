import json

# Define the data structure
data = {
    "domestic_violence": {
        "videoId": "1W8bFy1X2Ss",
        "en": {
            "summary": "You are protected under the Domestic Violence Act. Immediate help is available.",
            "emergencyActions": ["Call 181 Women Helpline", "Call 100 Police"],
            "relatedLaws": ["Protection of Women from Domestic Violence Act 2005"],
            "steps": [
                {"stepNumber": 1, "instruction": "Reach a safe place immediately.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "Call the Women's Helpline (181).", "icon": "phone"},
                {"stepNumber": 3, "instruction": "File a Domestic Incident Report (DIR) with a Protection Officer.", "icon": "file"}
            ],
            "documents": "Aadhaar Card, Medical reports (if injured), Marriage Certificate, Address Proof."
        },
        "hi": {
            "summary": "आप घरेलू हिंसा अधिनियम के तहत सुरक्षित हैं। तत्काल सहायता उपलब्ध है।",
            "emergencyActions": ["181 महिला हेल्पलाइन पर कॉल करें", "100 पुलिस को कॉल करें"],
            "relatedLaws": ["घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम 2005"],
            "steps": [
                {"stepNumber": 1, "instruction": "तुरंत किसी सुरक्षित स्थान पर पहुँचें।", "icon": "shield"},
                {"stepNumber": 2, "instruction": "महिला हेल्पलाइन (181) पर कॉल करें।", "icon": "phone"},
                {"stepNumber": 3, "instruction": "संरक्षण अधिकारी के पास घरेलू घटना रिपोर्ट (DIR) दर्ज करें।", "icon": "file"}
            ],
            "documents": "आधार कार्ड, मेडिकल रिपोर्ट (यदि घायल हों), विवाह प्रमाण पत्र, पते का प्रमाण।"
        },
        "mr": {
            "summary": "तुम्हाला कौटुंबिक हिंसाचार कायद्यांतर्गत संरक्षण आहे. तातडीची मदत उपलब्ध आहे.",
            "emergencyActions": ["१८१ महिला हेल्पलाइनवर कॉल करा", "१०० पोलिसांना कॉल करा"],
            "relatedLaws": ["कौटुंबिक हिंसाचारापासून महिलांचे संरक्षण कायदा २००५"],
            "steps": [
                {"stepNumber": 1, "instruction": "त्वरित सुरक्षित ठिकाणी जा.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "महिला हेल्पलाइन (१८१) वर कॉल करा.", "icon": "phone"},
                {"stepNumber": 3, "instruction": "संरक्षण अधिकाऱ्याकडे कौटुंबिक घटना अहवाल (DIR) नोंदवा.", "icon": "file"}
            ],
            "documents": "आधार कार्ड, वैद्यकीय अहवाल (दुखापत झाल्यास), विवाह प्रमाणपत्र, पत्त्याचा पुरावा."
        },
        "ta": {
            "summary": "குடும்ப வன்முறை சட்டத்தின் கீழ் நீங்கள் பாதுகாக்கப்படுகிறீர்கள். உடனடி உதவி கிடைக்கிறது.",
            "emergencyActions": ["181 மகளிர் உதவி எண்ணை அழைக்கவும்", "100 போலீஸ் அழைக்கவும்"],
            "relatedLaws": ["குடும்ப வன்முறையிலிருந்து பெண்களைப் பாதுகாக்கும் சட்டம் 2005"],
            "steps": [
                {"stepNumber": 1, "instruction": "உடனடியாக பாதுகாப்பான இடத்தை அடையவும்.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "மகளிர் உதவி எண்ணை (181) அழைக்கவும்.", "icon": "phone"},
                {"stepNumber": 3, "instruction": "பாதுகாப்பு அதிகாரியிடம் குடும்ப சம்பவ அறிக்கை (DIR) தாக்கல் செய்யவும்.", "icon": "file"}
            ],
            "documents": "ஆதார் அட்டை, மருத்துவ அறிக்கைகள், திருமணச் சான்றிதழ், முகவரிச் சான்று."
        }
    },
    "property_rights": {
        "videoId": "Y86MIgmy1xw",
        "en": {
            "summary": "Women have equal inheritance and property rights under the law.",
            "emergencyActions": ["File for injunction if facing eviction"],
            "relatedLaws": ["Hindu Succession Act (or applicable personal law)"],
            "steps": [
                {"stepNumber": 1, "instruction": "Collect all property documents and death certificates if applicable.", "icon": "file"},
                {"stepNumber": 2, "instruction": "Send a legal notice claiming your share.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "File a partition suit in civil court if denied.", "icon": "scale"}
            ],
            "documents": "Death Certificate of ancestor, Property Title Deeds, Aadhaar Card, Legal Heir Certificate."
        },
        "hi": {
            "summary": "कानून के तहत महिलाओं को समान विरासत और संपत्ति के अधिकार हैं।",
            "emergencyActions": ["बेदखली का सामना करने पर निषेधाज्ञा (Stay) के लिए आवेदन करें"],
            "relatedLaws": ["हिंदू उत्तराधिकार अधिनियम (या लागू व्यक्तिगत कानून)"],
            "steps": [
                {"stepNumber": 1, "instruction": "सभी संपत्ति दस्तावेज और यदि लागू हो तो मृत्यु प्रमाण पत्र एकत्र करें।", "icon": "file"},
                {"stepNumber": 2, "instruction": "अपने हिस्से का दावा करते हुए कानूनी नोटिस भेजें।", "icon": "shield"},
                {"stepNumber": 3, "instruction": "इनकार करने पर सिविल कोर्ट में विभाजन का मुकदमा दायर करें।", "icon": "scale"}
            ],
            "documents": "पूर्वज का मृत्यु प्रमाण पत्र, संपत्ति के स्वामित्व विलेख, आधार कार्ड, कानूनी वारिस प्रमाण पत्र।"
        },
        "mr": {
            "summary": "कायद्यानुसार महिलांना समान वारसा आणि मालमत्तेचे हक्क आहेत.",
            "emergencyActions": ["बेदखल केल्यास मनाई हुकुमासाठी अर्ज करा"],
            "relatedLaws": ["हिंदू वारसा कायदा (किंवा लागू वैयक्तिक कायदा)"],
            "steps": [
                {"stepNumber": 1, "instruction": "सर्व मालमत्तेची कागदपत्रे आणि लागू असल्यास मृत्यू प्रमाणपत्र गोळा करा.", "icon": "file"},
                {"stepNumber": 2, "instruction": "तुमच्या हिश्श्याची मागणी करणारी कायदेशीर नोटीस पाठवा.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "नकार दिल्यास दिवाणी न्यायालयात वाटपाचा दावा दाखल करा.", "icon": "scale"}
            ],
            "documents": "पूर्वजांचे मृत्यू प्रमाणपत्र, मालमत्तेचे टायटल डीड, आधार कार्ड, कायदेशीर वारस प्रमाणपत्र."
        },
        "ta": {
            "summary": "சட்டத்தின் கீழ் பெண்களுக்கு சமமான பரம்பரை மற்றும் சொத்துரிமைகள் உள்ளன.",
            "emergencyActions": ["வெளியேற்றப்பட்டால் தடையுத்தரவு கோரி விண்ணப்பிக்கவும்"],
            "relatedLaws": ["இந்து வாரிசு சட்டம் (அல்லது பொருந்தும் தனிப்பட்ட சட்டம்)"],
            "steps": [
                {"stepNumber": 1, "instruction": "அனைத்து சொத்து ஆவணங்கள் மற்றும் இறப்பு சான்றிதழ்களை சேகரிக்கவும்.", "icon": "file"},
                {"stepNumber": 2, "instruction": "உங்கள் பங்கை கோரி சட்டபூர்வ நோட்டீஸ் அனுப்பவும்.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "மறுக்கப்பட்டால் உரிமையியல் நீதிமன்றத்தில் பாகப்பிரிவினை வழக்கு தொடரவும்.", "icon": "scale"}
            ],
            "documents": "இறப்பு சான்றிதழ், சொத்து பத்திரம், ஆதார் அட்டை, வாரிசு சான்றிதழ்."
        }
    },
    "divorce": {
        "videoId": "X357f4P51EA",
        "en": {
            "summary": "You have the right to seek divorce and claim maintenance for yourself and your children.",
            "emergencyActions": ["File for interim maintenance"],
            "relatedLaws": ["Hindu Marriage Act, Section 125 CrPC"],
            "steps": [
                {"stepNumber": 1, "instruction": "Consult a family lawyer or Legal Services Authority.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "File a petition for divorce under the applicable marriage act.", "icon": "scale"},
                {"stepNumber": 3, "instruction": "Simultaneously file an application for maintenance under Section 125 CrPC.", "icon": "file"}
            ],
            "documents": "Marriage Certificate, Proof of husband's income, Bank statements, Wedding photographs."
        },
        "hi": {
            "summary": "आपको तलाक लेने और अपने तथा बच्चों के लिए भरण-पोषण मांगने का अधिकार है।",
            "emergencyActions": ["अंतरिम भरण-पोषण के लिए आवेदन करें"],
            "relatedLaws": ["हिंदू विवाह अधिनियम, धारा 125 CrPC"],
            "steps": [
                {"stepNumber": 1, "instruction": "पारिवारिक वकील या विधिक सेवा प्राधिकरण से सलाह लें।", "icon": "shield"},
                {"stepNumber": 2, "instruction": "लागू विवाह अधिनियम के तहत तलाक के लिए याचिका दायर करें।", "icon": "scale"},
                {"stepNumber": 3, "instruction": "साथ ही सीआरपीसी की धारा 125 के तहत भरण-पोषण का आवेदन दें।", "icon": "file"}
            ],
            "documents": "विवाह प्रमाण पत्र, पति की आय का प्रमाण, बैंक विवरण, शादी की तस्वीरें।"
        },
        "mr": {
            "summary": "तुम्हाला घटस्फोट घेण्याचा आणि स्वतःसाठी व मुलांसाठी पोटगी मागण्याचा अधिकार आहे.",
            "emergencyActions": ["अंतरिम पोटगीसाठी अर्ज करा"],
            "relatedLaws": ["हिंदू विवाह कायदा, कलम १२५ CrPC"],
            "steps": [
                {"stepNumber": 1, "instruction": "कौटुंबिक वकील किंवा विधी सेवा प्राधिकरणाचा सल्ला घ्या.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "लागू विवाह कायद्यांतर्गत घटस्फोटासाठी याचिका दाखल करा.", "icon": "scale"},
                {"stepNumber": 3, "instruction": "त्याचवेळी CrPC कलम १२५ अंतर्गत पोटगीसाठी अर्ज करा.", "icon": "file"}
            ],
            "documents": "विवाह प्रमाणपत्र, पतीच्या उत्पन्नाचा पुरावा, बँक स्टेटमेंट, लग्नाचे फोटो."
        },
        "ta": {
            "summary": "விவாகரத்து கோரவும், பராமரிப்பு கோரவும் உங்களுக்கு உரிமை உண்டு.",
            "emergencyActions": ["இடைக்கால பராமரிப்புக்காக விண்ணப்பிக்கவும்"],
            "relatedLaws": ["இந்து திருமண சட்டம், பிரிவு 125 CrPC"],
            "steps": [
                {"stepNumber": 1, "instruction": "குடும்ப வழக்கறிஞர் அல்லது சட்ட சேவைகள் அதிகார குழுவை அணுகவும்.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "விவாகரத்துக்காக மனு தாக்கல் செய்யவும்.", "icon": "scale"},
                {"stepNumber": 3, "instruction": "அதேநேரம் CrPC பிரிவு 125 இன் கீழ் பராமரிப்புக்கான விண்ணப்பத்தை தாக்கல் செய்யவும்.", "icon": "file"}
            ],
            "documents": "திருமண சான்றிதழ், கணவரின் வருமான சான்று, வங்கி அறிக்கைகள், திருமண புகைப்படங்கள்."
        }
    },
    "legal_aid": {
        "videoId": "mQXO6WWbx0I",
        "en": {
            "summary": "Women are entitled to free legal services from the government in India.",
            "emergencyActions": ["Visit the nearest DLSA office"],
            "relatedLaws": ["Legal Services Authorities Act, 1987"],
            "steps": [
                {"stepNumber": 1, "instruction": "Locate your nearest DLSA at the district court.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "Fill out the free legal aid application form.", "icon": "file"},
                {"stepNumber": 3, "instruction": "A free lawyer will be appointed to represent you.", "icon": "scale"}
            ],
            "documents": "Aadhaar Card, Case details, Income Certificate (women are generally exempt)."
        },
        "hi": {
            "summary": "भारत में महिलाओं को सरकार की ओर से मुफ्त कानूनी सेवाएं पाने का अधिकार है।",
            "emergencyActions": ["निकटतम DLSA कार्यालय जाएँ"],
            "relatedLaws": ["विधिक सेवा प्राधिकरण अधिनियम, 1987"],
            "steps": [
                {"stepNumber": 1, "instruction": "जिला अदालत में अपने निकटतम DLSA का पता लगाएँ।", "icon": "shield"},
                {"stepNumber": 2, "instruction": "मुफ्त कानूनी सहायता आवेदन पत्र भरें।", "icon": "file"},
                {"stepNumber": 3, "instruction": "आपका प्रतिनिधित्व करने के लिए एक मुफ्त वकील नियुक्त किया जाएगा।", "icon": "scale"}
            ],
            "documents": "आधार कार्ड, मामले का विवरण, आय प्रमाण पत्र (महिलाओं को आमतौर पर छूट होती है)।"
        },
        "mr": {
            "summary": "भारतात महिलांना सरकारकडून मोफत कायदेशीर सेवा मिळण्याचा अधिकार आहे.",
            "emergencyActions": ["जवळच्या DLSA कार्यालयाला भेट द्या"],
            "relatedLaws": ["विधी सेवा प्राधिकरण कायदा, १९८७"],
            "steps": [
                {"stepNumber": 1, "instruction": "जिल्हा न्यायालयात जवळचे DLSA शोधा.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "मोफत कायदेशीर मदत अर्ज भरा.", "icon": "file"},
                {"stepNumber": 3, "instruction": "तुमच्यासाठी एक मोफत वकील नियुक्त केला जाईल.", "icon": "scale"}
            ],
            "documents": "आधार कार्ड, प्रकरणाचा तपशील, उत्पन्न प्रमाणपत्र (महिलांना सहसा सूट असते)."
        },
        "ta": {
            "summary": "இந்தியாவில் பெண்களுக்கு இலவச சட்ட சேவைகளைப் பெற உரிமை உள்ளது.",
            "emergencyActions": ["அருகிலுள்ள DLSA அலுவலகத்தை அணுகவும்"],
            "relatedLaws": ["சட்ட சேவைகள் அதிகாரிகள் சட்டம், 1987"],
            "steps": [
                {"stepNumber": 1, "instruction": "மாவட்ட நீதிமன்றத்தில் உள்ள உங்கள் அருகிலுள்ள DLSA ஐ கண்டறியவும்.", "icon": "shield"},
                {"stepNumber": 2, "instruction": "இலவச சட்ட உதவி விண்ணப்ப படிவத்தை நிரப்பவும்.", "icon": "file"},
                {"stepNumber": 3, "instruction": "உங்களுக்காக ஒரு இலவச வழக்கறிஞர் நியமிக்கப்படுவார்.", "icon": "scale"}
            ],
            "documents": "ஆதார் அட்டை, வழக்கு விவரங்கள், வருமான சான்றிதழ் (பெண்களுக்கு பொதுவாக விலக்கு உண்டு)."
        }
    },
    "fir": {
        "videoId": "H66ugKoX0AU",
        "en": {
            "summary": "Registering an FIR is your right. If police refuse, there are legal remedies.",
            "emergencyActions": ["Send complaint to SP via registered post"],
            "relatedLaws": ["Section 154 CrPC, Section 156(3) CrPC"],
            "steps": [
                {"stepNumber": 1, "instruction": "Go to the police station and give a written complaint.", "icon": "file"},
                {"stepNumber": 2, "instruction": "Get a free copy of the registered FIR.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "If refused, approach the Superintendent of Police or file a private complaint in court.", "icon": "scale"}
            ],
            "documents": "Written complaint with incident details, Identity Proof, Medical evidence (if applicable)."
        },
        "hi": {
            "summary": "FIR दर्ज कराना आपका अधिकार है। पुलिस के मना करने पर कानूनी उपाय उपलब्ध हैं।",
            "emergencyActions": ["पंजीकृत डाक से SP को शिकायत भेजें"],
            "relatedLaws": ["धारा 154 CrPC, धारा 156(3) CrPC"],
            "steps": [
                {"stepNumber": 1, "instruction": "पुलिस स्टेशन जाएं और लिखित शिकायत दें।", "icon": "file"},
                {"stepNumber": 2, "instruction": "दर्ज FIR की मुफ्त कॉपी प्राप्त करें।", "icon": "shield"},
                {"stepNumber": 3, "instruction": "यदि मना कर दिया जाए, तो SP से संपर्क करें या अदालत में निजी शिकायत दर्ज करें।", "icon": "scale"}
            ],
            "documents": "घटना के विवरण के साथ लिखित शिकायत, पहचान प्रमाण, चिकित्सा साक्ष्य (यदि लागू हो)।"
        },
        "mr": {
            "summary": "FIR नोंदवणे हा तुमचा हक्क आहे. पोलिसांनी नकार दिल्यास कायदेशीर उपाय आहेत.",
            "emergencyActions": ["नोंदणीकृत टपालाने SP कडे तक्रार पाठवा"],
            "relatedLaws": ["कलम १५४ CrPC, कलम १५६(३) CrPC"],
            "steps": [
                {"stepNumber": 1, "instruction": "पोलीस स्टेशनमध्ये जा आणि लेखी तक्रार द्या.", "icon": "file"},
                {"stepNumber": 2, "instruction": "नोंदवलेल्या FIR ची मोफत प्रत मिळवा.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "नकार दिल्यास पोलीस अधीक्षकांशी (SP) संपर्क साधा किंवा न्यायालयात खाजगी तक्रार दाखल करा.", "icon": "scale"}
            ],
            "documents": "घटनेच्या तपशीलासह लेखी तक्रार, ओळखपत्र, वैद्यकीय पुरावा (लागू असल्यास)."
        },
        "ta": {
            "summary": "FIR பதிவு செய்வது உங்கள் உரிமை. போலீஸ் மறுத்தால் சட்ட தீர்வுகள் உள்ளன.",
            "emergencyActions": ["பதிவு தபால் மூலம் SP க்கு புகார் அனுப்பவும்"],
            "relatedLaws": ["பிரிவு 154 CrPC, பிரிவு 156(3) CrPC"],
            "steps": [
                {"stepNumber": 1, "instruction": "காவல் நிலையம் சென்று எழுத்துப்பூர்வமாக புகார் அளிக்கவும்.", "icon": "file"},
                {"stepNumber": 2, "instruction": "பதிவு செய்யப்பட்ட FIR இன் இலவச நகலைப் பெறவும்.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "மறுக்கப்பட்டால், காவல் கண்காணிப்பாளரை அணுகவும் அல்லது நீதிமன்றத்தில் தனியார் புகார் அளிக்கவும.", "icon": "scale"}
            ],
            "documents": "புகார் கடிதம், அடையாளச் சான்று, மருத்துவச் சான்று (பொருந்தினால்)."
        }
    },
    "child_custody": {
        "videoId": "6NsLg4Cg27I",
        "en": {
            "summary": "The welfare of the child is the paramount consideration for custody in Indian courts.",
            "emergencyActions": ["Call police if child is taken forcibly"],
            "relatedLaws": ["Guardians and Wards Act, 1890", "Hindu Minority and Guardianship Act"],
            "steps": [
                {"stepNumber": 1, "instruction": "File a petition for child custody in the Family Court.", "icon": "scale"},
                {"stepNumber": 2, "instruction": "Show that you can provide a better environment for the child.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "Seek immediate visitation rights if separated.", "icon": "file"}
            ],
            "documents": "Child's Birth Certificate, School records, Proof of income to support child."
        },
        "hi": {
            "summary": "भारतीय अदालतों में कस्टडी के लिए बच्चे का कल्याण सर्वोपरि है।",
            "emergencyActions": ["यदि बच्चा जबरन ले जाया जाए तो पुलिस को बुलाएं"],
            "relatedLaws": ["संरक्षक और प्रतिपाल्य अधिनियम, 1890", "हिंदू अल्पसंख्यक और संरक्षकता अधिनियम"],
            "steps": [
                {"stepNumber": 1, "instruction": "फैमिली कोर्ट में बच्चे की कस्टडी के लिए याचिका दायर करें।", "icon": "scale"},
                {"stepNumber": 2, "instruction": "दिखाएं कि आप बच्चे को बेहतर माहौल दे सकते हैं।", "icon": "shield"},
                {"stepNumber": 3, "instruction": "यदि बच्चे से अलग कर दिया गया हो तो तत्काल मिलने (visitation) का अधिकार मांगें।", "icon": "file"}
            ],
            "documents": "बच्चे का जन्म प्रमाण पत्र, स्कूल रिकॉर्ड, बच्चे के भरण-पोषण के लिए आय का प्रमाण।"
        },
        "mr": {
            "summary": "भारतीय न्यायालयांमध्ये कस्टडीसाठी मुलाचे कल्याण सर्वात महत्त्वाचे मानले जाते.",
            "emergencyActions": ["मूल जबरदस्तीने नेल्यास पोलिसांना बोलावा"],
            "relatedLaws": ["पालक आणि पाल्य कायदा, १८९०", "हिंदू अल्पसंख्याक आणि पालकत्व कायदा"],
            "steps": [
                {"stepNumber": 1, "instruction": "फॅमिली कोर्टात मुलाच्या कस्टडीसाठी याचिका दाखल करा.", "icon": "scale"},
                {"stepNumber": 2, "instruction": "तुम्ही मुलाला अधिक चांगले वातावरण देऊ शकता हे सिद्ध करा.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "मुलापासून वेगळे झाल्यास त्वरित भेटीचा अधिकार (visitation rights) मागा.", "icon": "file"}
            ],
            "documents": "मुलाचा जन्म दाखला, शाळेचे रेकॉर्ड, मुलाच्या पोषणासाठी उत्पन्नाचा पुरावा."
        },
        "ta": {
            "summary": "இந்திய நீதிமன்றங்களில் குழந்தையின் நலனே முதன்மையானது.",
            "emergencyActions": ["குழந்தை பலவந்தமாக அழைத்துச் செல்லப்பட்டால் போலீஸை அழைக்கவும்"],
            "relatedLaws": ["பாதுகாவலர் சட்டம், 1890", "இந்து சிறுபான்மை மற்றும் பாதுகாப்பாளர் சட்டம்"],
            "steps": [
                {"stepNumber": 1, "instruction": "குழந்தை காவலுக்காக குடும்ப நீதிமன்றத்தில் மனு தாக்கல் செய்யவும்.", "icon": "scale"},
                {"stepNumber": 2, "instruction": "குழந்தைக்கு சிறந்த சூழலை உங்களால் வழங்க முடியும் என்பதை நிரூபிக்கவும்.", "icon": "shield"},
                {"stepNumber": 3, "instruction": "பிரிந்திருந்தால் உடனடியாக பார்க்கும் உரிமையை கோரவும்.", "icon": "file"}
            ],
            "documents": "குழந்தையின் பிறப்புச் சான்றிதழ், பள்ளி பதிவுகள், வருமானச் சான்று."
        }
    }
}

with open('src/app/api/chat/responses.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Generated responses.json successfully!")
