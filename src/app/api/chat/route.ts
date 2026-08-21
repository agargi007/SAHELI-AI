import { NextResponse } from 'next/server';
import responses from './responses.json';

function detectCategory(message: string): keyof typeof responses {
  const text = message.toLowerCase();
  
  // Child Custody: child, custody, kid, son, daughter, bacha, baccha, mulga, mulgi, kuzhandhai, magan, magal
  if (text.includes('child') || text.includes('custody') || text.includes('kid') || text.includes('son') || text.includes('daughter') || text.includes('bach') || text.includes('mulg') || text.includes('kuzhandhai') || text.includes('magan') || text.includes('magal')) {
    return 'child_custody';
  }
  // Divorce & Maintenance: divorce, separate, maintenance, alimony, talaq, talak, potgi, vivah vicched, vivakarethu, jeevanamsham
  if (text.includes('divorce') || text.includes('separate') || text.includes('maintenance') || text.includes('alimony') || text.includes('talaq') || text.includes('talak') || text.includes('potgi') || text.includes('vicched') || text.includes('vivakarethu') || text.includes('jeevanamsham')) {
    return 'divorce';
  }
  // Property Rights: property, land, inherit, house, evict, sampatti, zameen, hissa, jameen, jamin, ghar, malmatta, sotthu, nilam
  if (text.includes('property') || text.includes('land') || text.includes('inherit') || text.includes('house') || text.includes('evict') || text.includes('sampatti') || text.includes('zameen') || text.includes('hissa') || text.includes('jameen') || text.includes('ghar') || text.includes('malmatta') || text.includes('sotthu') || text.includes('nilam')) {
    return 'property_rights';
  }
  // FIR / Police: fir, police, complain, register, f.i.r, takrar, pukhar, kaval
  if (text.includes('fir') || text.includes('police') || text.includes('complain') || text.includes('register') || text.includes('takrar') || text.includes('pukhar') || text.includes('kaval')) {
    return 'fir';
  }
  // Legal Aid: lawyer, free, aid, dlsa, vakil, wakeel, mofat, ilavasa
  if (text.includes('lawyer') || text.includes('free') || text.includes('aid') || text.includes('dlsa') || text.includes('vakil') || text.includes('wakeel') || text.includes('mofat') || text.includes('ilavasa')) {
    return 'legal_aid';
  }
  // Default fallback
  return 'domestic_violence';
}

export async function POST(req: Request) {
  try {
    const { message, language, isVoice } = await req.json();

    const category = detectCategory(message);
    const categoryData = responses[category as keyof typeof responses];
    
    const lang = ['hi', 'mr', 'ta'].includes(language) ? language : 'en';
    const langData = (categoryData as any)[lang] || (categoryData as any)['en'];

    return NextResponse.json({
      category: category,
      language: lang,
      videoId: categoryData.videoId,
      summary: langData.summary,
      steps: langData.steps,
      emergencyActions: langData.emergencyActions,
      relatedLaws: langData.relatedLaws,
      documents: langData.documents,
      helplineNumbers: ["181", "100"]
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
