'use client'

import { useState, useEffect, useCallback } from 'react'

// Trie data structure for efficient word prediction
class TrieNode {
  children: Map<string, TrieNode> = new Map()
  isEndOfWord: boolean = false
  frequency: number = 0
}

class WordTrie {
  root: TrieNode = new TrieNode()

  insert(word: string, frequency: number = 1) {
    let node = this.root
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode())
      }
      node = node.children.get(char)!
    }
    node.isEndOfWord = true
    node.frequency = frequency
  }

  searchPrefix(prefix: string): Array<{word: string, frequency: number}> {
    let node = this.root
    for (const char of prefix.toLowerCase()) {
      if (!node.children.has(char)) {
        return []
      }
      node = node.children.get(char)!
    }

    const results: Array<{word: string, frequency: number}> = []
    this.collectWords(node, prefix.toLowerCase(), results)
    return results.sort((a, b) => b.frequency - a.frequency).slice(0, 5)
  }

  private collectWords(node: TrieNode, currentWord: string, results: Array<{word: string, frequency: number}>) {
    if (node.isEndOfWord) {
      results.push({ word: currentWord, frequency: node.frequency })
    }

    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, currentWord + char, results)
    }
  }
}

// Initialize trie with word frequencies
const wordTrie = new WordTrie()

// Common English words with frequencies for better prediction
const WORD_FREQUENCIES: Record<string, number> = {
  'the': 22038615, 'and': 10741073, 'for': 5830292, 'are': 4507416, 'but': 4388087, 'not': 4281574,
  'you': 4206423, 'all': 4092490, 'can': 3975420, 'had': 3880413, 'her': 3877135, 'was': 3834589,
  'one': 3782313, 'our': 3750912, 'out': 3727991, 'day': 3654305, 'get': 3614967, 'has': 3581756,
  'him': 3561842, 'his': 3555287, 'how': 3511788, 'its': 3486237, 'may': 3460884, 'new': 3448169,
  'now': 3440290, 'old': 3426144, 'see': 3417594, 'two': 3405451, 'way': 3394735, 'who': 3386369,
  'boy': 3375045, 'did': 3366298, 'let': 3358627, 'put': 3355497, 'say': 3355497, 'she': 3355497,
  'too': 3355497, 'use': 3355497, 'that': 3256670, 'with': 3189467, 'have': 3164793, 'this': 3108515,
  'will': 3108515, 'your': 3108515, 'from': 3108515, 'they': 3108515, 'know': 3108515, 'want': 3108515,
  'been': 3108515, 'good': 3108515, 'much': 3108515, 'some': 3108515, 'time': 3108515, 'very': 3108515,
  'when': 3108515, 'come': 3108515, 'here': 3108515, 'just': 3108515, 'like': 3108515, 'long': 3108515,
  'make': 3108515, 'many': 3108515, 'over': 3108515, 'such': 3108515, 'take': 3108515, 'than': 3108515,
  'them': 3108515, 'well': 3108515, 'were': 3108515, 'what': 3108515, 'could': 3108515, 'said': 3108515,
  'each': 3108515, 'which': 3108515, 'their': 3108515, 'about': 3108515, 'would': 3108515, 'there': 3108515,
  'think': 3108515, 'other': 3108515, 'only': 3108515, 'then': 3108515, 'into': 3108515, 'more': 3108515,
  'these': 3108515, 'also': 3108515, 'first': 3108515, 'made': 3108515, 'look': 3108515, 'before': 3108515,
  'great': 3108515, 'where': 3108515, 'most': 3108515, 'after': 3108515, 'through': 3108515, 'back': 3108515,
  'another': 3108515, 'last': 3108515, 'never': 3108515, 'work': 3108515, 'year': 3108515, 'people': 3108515,
  'home': 3108515, 'because': 3108515, 'right': 3108515, 'still': 3108515, 'should': 3108515, 'little': 3108515,
  'even': 3108515, 'hand': 3108515, 'life': 3108515, 'tell': 3108515, 'every': 3108515, 'find': 3108515,
  'give': 3108515, 'man': 3108515, 'thing': 3108515, 'child': 3108515, 'down': 3108515, 'side': 3108515,
  'head': 3108515, 'eye': 3108515, 'face': 3108515, 'place': 3108515, 'while': 3108515, 'away': 3108515,
  'house': 3108515, 'world': 3108515, 'school': 3108515, 'always': 3108515, 'until': 3108515, 'left': 3108515,
  'don': 3108515, 'few': 3108515, 'night': 3108515, 'live': 3108515, 'point': 3108515, 'believe': 3108515,
  'hold': 3108515, 'today': 3108515, 'bring': 3108515, 'happen': 3108515, 'next': 3108515, 'without': 3108515,
  'large': 3108515, 'million': 3108515, 'must': 3108515, 'system': 3108515, 'three': 3108515, 'under': 3108515,
  'water': 3108515, 'room': 3108515, 'write': 3108515, 'mother': 3108515, 'area': 3108515, 'national': 3108515,
  'money': 3108515, 'story': 3108515, 'young': 3108515, 'fact': 3108515, 'month': 3108515, 'different': 3108515,
  'lot': 3108515, 'study': 3108515, 'book': 3108515, 'job': 3108515, 'word': 3108515, 'though': 3108515,
  'business': 3108515, 'issue': 3108515, 'kind': 3108515, 'four': 3108515, 'far': 3108515, 'black': 3108515,
  'both': 3108515, 'yes': 3108515, 'since': 3108515, 'provide': 3108515, 'service': 3108515, 'friend': 3108515,
  'important': 3108515, 'father': 3108515, 'power': 3108515, 'hour': 3108515, 'game': 3108515, 'often': 3108515,
  'line': 3108515, 'political': 3108515, 'end': 3108515, 'among': 3108515, 'ever': 3108515, 'stand': 3108515,
  'bad': 3108515, 'lose': 3108515, 'however': 3108515, 'member': 3108515, 'pay': 3108515, 'law': 3108515,
  'meet': 3108515, 'car': 3108515, 'city': 3108515, 'almost': 3108515, 'include': 3108515, 'continue': 3108515,
  'set': 3108515, 'later': 3108515, 'community': 3108515, 'name': 3108515, 'five': 3108515, 'once': 3108515,
  'white': 3108515, 'least': 3108515, 'president': 3108515, 'learn': 3108515, 'real': 3108515, 'change': 3108515,
  'team': 3108515, 'minute': 3108515, 'best': 3108515, 'several': 3108515, 'idea': 3108515, 'kid': 3108515,
  'body': 3108515, 'information': 3108515, 'nothing': 3108515, 'ago': 3108515, 'lead': 3108515, 'social': 3108515,
  'understand': 3108515, 'whether': 3108515, 'watch': 3108515, 'together': 3108515, 'follow': 3108515,
  'parent': 3108515, 'stop': 3108515, 'anything': 3108515, 'create': 3108515, 'public': 3108515, 'already': 3108515,
  'speak': 3108515, 'others': 3108515, 'read': 3108515, 'level': 3108515, 'allow': 3108515, 'add': 3108515,
  'office': 3108515, 'spend': 3108515, 'door': 3108515, 'health': 3108515, 'person': 3108515, 'art': 3108515,
  'sure': 3108515, 'war': 3108515, 'history': 3108515, 'party': 3108515, 'within': 3108515, 'grow': 3108515,
  'result': 3108515, 'open': 3108515, 'morning': 3108515, 'walk': 3108515, 'reason': 3108515, 'low': 3108515,
  'win': 3108515, 'research': 3108515, 'girl': 3108515, 'guy': 3108515, 'early': 3108515, 'food': 3108515,
  'moment': 3108515, 'himself': 3108515, 'air': 3108515, 'teacher': 3108515, 'force': 3108515, 'offer': 3108515,
  'enough': 3108515, 'education': 3108515, 'across': 3108515, 'although': 3108515, 'remember': 3108515,
  'foot': 3108515, 'second': 3108515, 'able': 3108515, 'toward': 3108515, 'send': 3108515, 'expect': 3108515,
  'sense': 3108515, 'build': 3108515, 'stay': 3108515, 'fall': 3108515, 'nation': 3108515, 'plan': 3108515,
  'cut': 3108515, 'college': 3108515, 'interest': 3108515, 'death': 3108515, 'course': 3108515, 'someone': 3108515,
  'experience': 3108515, 'behind': 3108515, 'reach': 3108515, 'local': 3108515, 'kill': 3108515, 'six': 3108515,
  'remain': 3108515, 'effect': 3108515, 'yeah': 3108515, 'suggest': 3108515, 'class': 3108515, 'control': 3108515,
  'raise': 3108515, 'care': 3108515, 'perhaps': 3108515, 'late': 3108515, 'hard': 3108515, 'field': 3108515,
  'else': 3108515, 'pass': 3108515, 'former': 3108515, 'sell': 3108515, 'major': 3108515, 'sometimes': 3108515,
  'require': 3108515, 'along': 3108515, 'development': 3108515, 'themselves': 3108515, 'role': 3108515,
  'better': 3108515, 'economic': 3108515, 'effort': 3108515, 'decide': 3108515, 'rate': 3108515, 'strong': 3108515,
  'possible': 3108515, 'heart': 3108515, 'drug': 3108515, 'show': 3108515, 'leader': 3108515, 'light': 3108515,
  'voice': 3108515, 'wife': 3108515, 'whole': 3108515, 'police': 3108515, 'mind': 3108515, 'finally': 3108515,
  'pull': 3108515, 'return': 3108515, 'free': 3108515, 'military': 3108515, 'price': 3108515, 'less': 3108515,
  'according': 3108515, 'decision': 3108515, 'explain': 3108515, 'son': 3108515, 'hope': 3108515, 'develop': 3108515,
  'view': 3108515, 'relationship': 3108515, 'carry': 3108515, 'town': 3108515, 'road': 3108515, 'drive': 3108515,
  'arm': 3108515, 'true': 3108515, 'federal': 3108515, 'break': 3108515, 'difference': 3108515, 'thank': 3108515,
  'receive': 3108515, 'value': 3108515, 'international': 3108515, 'building': 3108515, 'action': 3108515, 'full': 3108515,
  'model': 3108515, 'join': 3108515, 'season': 3108515, 'society': 3108515, 'tax': 3108515, 'director': 3108515,
  'position': 3108515, 'player': 3108515, 'agree': 3108515, 'especially': 3108515, 'record': 3108515, 'pick': 3108515,
  'wear': 3108515, 'paper': 3108515, 'special': 3108515, 'space': 3108515, 'ground': 3108515, 'form': 3108515,
  'support': 3108515, 'event': 3108515, 'official': 3108515, 'whose': 3108515, 'matter': 3108515, 'everyone': 3108515,
  'center': 3108515, 'couple': 3108515, 'site': 3108515, 'project': 3108515, 'hit': 3108515, 'base': 3108515,
  'activity': 3108515, 'star': 3108515, 'table': 3108515, 'need': 3108515, 'court': 3108515, 'produce': 3108515,
  'eat': 3108515, 'American': 3108515, 'teach': 3108515, 'oil': 3108515, 'situation': 3108515, 'easy': 3108515,
  'cost': 3108515, 'industry': 3108515, 'figure': 3108515, 'street': 3108515, 'image': 3108515, 'itself': 3108515,
  'phone': 3108515, 'either': 3108515, 'data': 3108515, 'cover': 3108515, 'quite': 3108515, 'picture': 3108515,
  'clear': 3108515, 'practice': 3108515, 'piece': 3108515, 'land': 3108515, 'recent': 3108515, 'describe': 3108515,
  'product': 3108515, 'doctor': 3108515, 'wall': 3108515, 'patient': 3108515, 'worker': 3108515, 'news': 3108515,
  'test': 3108515, 'movie': 3108515, 'certain': 3108515, 'north': 3108515, 'love': 3108515, 'personal': 3108515,
  'simply': 3108515, 'third': 3108515, 'technology': 3108515, 'catch': 3108515, 'step': 3108515, 'baby': 3108515,
  'computer': 3108515, 'type': 3108515, 'attention': 3108515, 'draw': 3108515, 'film': 3108515, 'Republican': 3108515,
  'tree': 3108515, 'source': 3108515, 'red': 3108515, 'nearly': 3108515, 'organization': 3108515, 'choose': 3108515,
  'cause': 3108515, 'hair': 3108515, 'century': 3108515, 'evidence': 3108515, 'window': 3108515, 'difficult': 3108515,
  'listen': 3108515, 'soon': 3108515, 'culture': 3108515, 'billion': 3108515, 'chance': 3108515, 'brother': 3108515,
  'energy': 3108515, 'period': 3108515, 'summer': 3108515, 'realize': 3108515, 'hundred': 3108515, 'available': 3108515,
  'plant': 3108515, 'likely': 3108515, 'opportunity': 3108515, 'term': 3108515, 'short': 3108515, 'letter': 3108515,
  'condition': 3108515, 'choice': 3108515, 'single': 3108515, 'rule': 3108515, 'daughter': 3108515, 'administration': 3108515,
  'south': 3108515, 'husband': 3108515, 'Congress': 3108515, 'floor': 3108515, 'campaign': 3108515, 'material': 3108515,
  'population': 3108515, 'call': 3108515, 'economy': 3108515, 'medical': 3108515, 'hospital': 3108515, 'church': 3108515,
  'close': 3108515, 'thousand': 3108515, 'risk': 3108515, 'current': 3108515, 'fire': 3108515, 'future': 3108515,
  'wrong': 3108515, 'involve': 3108515, 'defense': 3108515, 'anyone': 3108515, 'increase': 3108515, 'security': 3108515,
  'bank': 3108515, 'myself': 3108515, 'certainly': 3108515, 'west': 3108515, 'sport': 3108515, 'board': 3108515,
  'seek': 3108515, 'per': 3108515, 'subject': 3108515, 'officer': 3108515, 'private': 3108515, 'rest': 3108515,
  'behavior': 3108515, 'deal': 3108515, 'performance': 3108515, 'fight': 3108515, 'throw': 3108515, 'top': 3108515,
  'quickly': 3108515, 'past': 3108515, 'goal': 3108515, 'bed': 3108515, 'order': 3108515, 'author': 3108515,
  'fill': 3108515, 'represent': 3108515, 'focus': 3108515, 'foreign': 3108515, 'drop': 3108515, 'blood': 3108515,
  'upon': 3108515, 'agency': 3108515, 'push': 3108515, 'nature': 3108515, 'color': 3108515, 'recently': 3108515,
  'store': 3108515, 'reduce': 3108515, 'sound': 3108515, 'note': 3108515, 'fine': 3108515, 'near': 3108515,
  'movement': 3108515, 'page': 3108515, 'enter': 3108515, 'share': 3108515, 'common': 3108515, 'poor': 3108515,
  'natural': 3108515, 'race': 3108515, 'concern': 3108515, 'series': 3108515, 'significant': 3108515, 'similar': 3108515,
  'hot': 3108515, 'language': 3108515, 'usually': 3108515, 'response': 3108515, 'dead': 3108515, 'rise': 3108515,
  'animal': 3108515, 'factor': 3108515, 'decade': 3108515, 'article': 3108515, 'shoot': 3108515, 'east': 3108515,
  'save': 3108515, 'seven': 3108515, 'artist': 3108515, 'scene': 3108515, 'stock': 3108515, 'career': 3108515,
  'despite': 3108515, 'central': 3108515, 'eight': 3108515, 'thus': 3108515, 'treatment': 3108515, 'beyond': 3108515,
  'happy': 3108515, 'exactly': 3108515, 'protect': 3108515, 'approach': 3108515, 'lie': 3108515, 'size': 3108515,
  'dog': 3108515, 'fund': 3108515, 'serious': 3108515, 'occur': 3108515, 'media': 3108515, 'ready': 3108515,
  'sign': 3108515, 'thought': 3108515, 'list': 3108515, 'individual': 3108515, 'simple': 3108515, 'quality': 3108515,
  'pressure': 3108515, 'accept': 3108515, 'answer': 3108515, 'resource': 3108515, 'identify': 3108515,
  'meeting': 3108515, 'determine': 3108515, 'prepare': 3108515, 'disease': 3108515, 'whatever': 3108515, 'success': 3108515,
  'argue': 3108515, 'cup': 3108515, 'particularly': 3108515, 'amount': 3108515, 'ability': 3108515, 'staff': 3108515,
  'recognize': 3108515, 'indicate': 3108515, 'character': 3108515, 'growth': 3108515, 'loss': 3108515, 'degree': 3108515,
  'wonder': 3108515, 'attack': 3108515, 'herself': 3108515, 'region': 3108515, 'television': 3108515, 'box': 3108515,
  'TV': 3108515, 'training': 3108515, 'pretty': 3108515, 'trade': 3108515, 'election': 3108515, 'everybody': 3108515,
  'physical': 3108515, 'lay': 3108515, 'general': 3108515, 'feeling': 3108515, 'standard': 3108515, 'bill': 3108515,
  'message': 3108515, 'fail': 3108515, 'outside': 3108515, 'arrive': 3108515, 'analysis': 3108515, 'benefit': 3108515,
  'sex': 3108515, 'forward': 3108515, 'lawyer': 3108515, 'present': 3108515, 'section': 3108515, 'environmental': 3108515,
  'glass': 3108515, 'skill': 3108515, 'sister': 3108515, 'PM': 3108515, 'professor': 3108515, 'operation': 3108515,
  'financial': 3108515, 'crime': 3108515, 'stage': 3108515, 'ok': 3108515, 'compare': 3108515, 'authority': 3108515,
  'miss': 3108515, 'sort': 3108515, 'act': 3108515, 'ten': 3108515, 'knowledge': 3108515, 'gun': 3108515,
  'station': 3108515, 'blue': 3108515, 'strategy': 3108515, 'clearly': 3108515, 'discuss': 3108515, 'indeed': 3108515,
  'truth': 3108515, 'song': 3108515, 'example': 3108515, 'democratic': 3108515, 'check': 3108515, 'environment': 3108515,
  'leg': 3108515, 'dark': 3108515, 'various': 3108515, 'rather': 3108515, 'laugh': 3108515, 'guess': 3108515,
  'executive': 3108515, 'prove': 3108515, 'hang': 3108515, 'entire': 3108515, 'rock': 3108515, 'forget': 3108515,
  'claim': 3108515, 'remove': 3108515, 'manager': 3108515, 'enjoy': 3108515, 'network': 3108515, 'legal': 3108515,
  'religious': 3108515, 'cold': 3108515, 'final': 3108515, 'green': 3108515, 'fresh': 3108515, 'global': 3108515,
  'self': 3108515, 'spring': 3108515, 'firm': 3108515, 'Democrat': 3108515, 'radio': 3108515, 'visit': 3108515,
  'management': 3108515, 'avoid': 3108515, 'imagine': 3108515, 'tonight': 3108515, 'huge': 3108515, 'ball': 3108515,
  'finish': 3108515, 'yourself': 3108515, 'theory': 3108515, 'impact': 3108515, 'respond': 3108515, 'statement': 3108515,
  'maintain': 3108515, 'charge': 3108515, 'popular': 3108515, 'traditional': 3108515, 'onto': 3108515, 'reveal': 3108515,
  'direction': 3108515, 'weapon': 3108515, 'employee': 3108515, 'cultural': 3108515, 'contain': 3108515, 'peace': 3108515,
  'pain': 3108515, 'apply': 3108515, 'play': 3108515, 'measure': 3108515, 'wide': 3108515, 'shake': 3108515,
  'fly': 3108515, 'interview': 3108515, 'manage': 3108515, 'chair': 3108515, 'fish': 3108515, 'particular': 3108515,
  'camera': 3108515, 'structure': 3108515, 'politics': 3108515, 'perform': 3108515, 'weight': 3108515, 'suddenly': 3108515,
  'discover': 3108515, 'candidate': 3108515, 'production': 3108515, 'treat': 3108515, 'trip': 3108515, 'evening': 3108515,
  'affect': 3108515, 'inside': 3108515, 'conference': 3108515, 'unit': 3108515, 'style': 3108515, 'adult': 3108515,
  'worry': 3108515, 'range': 3108515, 'mention': 3108515, 'deep': 3108515, 'edge': 3108515, 'specific': 3108515,
  'writer': 3108515, 'trouble': 3108515, 'necessary': 3108515, 'throughout': 3108515, 'challenge': 3108515, 'fear': 3108515,
  'shoulder': 3108515, 'institution': 3108515, 'middle': 3108515, 'sea': 3108515, 'dream': 3108515, 'bar': 3108515,
  'beautiful': 3108515, 'property': 3108515, 'instead': 3108515, 'improve': 3108515, 'stuff': 3108515, 'detail': 3108515
}

// Initialize trie with word frequencies
Object.entries(WORD_FREQUENCIES).forEach(([word, frequency]) => {
  wordTrie.insert(word, frequency)
})

console.log('Trie initialized with', Object.keys(WORD_FREQUENCIES).length, 'words')

// Test the trie
console.log('Testing trie search for "the":', wordTrie.searchPrefix('the'))
console.log('Testing trie search for "a":', wordTrie.searchPrefix('a'))

export function useWordPrediction() {
  const [hoveredSequence, setHoveredSequence] = useState<string>('')
  const [predictions, setPredictions] = useState<string[]>([])
  const [showPredictions, setShowPredictions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const addHoveredKey = useCallback((key: string) => {
    console.log('addHoveredKey called with:', key)
    setHoveredSequence(prev => prev + key.toLowerCase())
  }, [])

  const clearSequence = useCallback(() => {
    setHoveredSequence('')
    setPredictions([])
    setShowPredictions(false)
    setIsGenerating(false)
  }, [])

  const selectWord = useCallback((_word: string) => {
    // Could implement word selection logic here
    clearSequence()
  }, [clearSequence])

  // Generate predictions immediately for testing
  useEffect(() => {
    if (hoveredSequence.length === 0) {
      setPredictions(['hello', 'world', 'test'])
      setShowPredictions(true)
      setIsGenerating(false)
      return
    }

    // Use the trie for efficient prefix matching with frequency-based ranking
    const matches = wordTrie.searchPrefix(hoveredSequence)
    const predictions = matches.map(match => match.word).slice(0, 5)

    console.log('Hovered sequence:', hoveredSequence)
    console.log('Trie matches:', matches)
    console.log('Predictions:', predictions)

    // If no matches from trie, show some defaults
    if (predictions.length === 0) {
      setPredictions(['hello', 'world', 'test'])
    } else {
      setPredictions(predictions)
    }
    setShowPredictions(true)
    setIsGenerating(false)
  }, [hoveredSequence])

  return {
    hoveredSequence,
    predictions: showPredictions ? predictions : [],
    isGenerating,
    addHoveredKey,
    clearSequence,
    selectWord
  }
}