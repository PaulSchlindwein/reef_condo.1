'use client';

import { useEffect, useState } from 'react';
import { Edit, List, ArrowLeft, Save, X, Plus, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

type Block = { id: string; value: string };
type Item = { id: string; position: number; data: Record<string, unknown> };

type Mode = 'home' | 'edit-text' | 'edit-lists';
type TextEditStep = 'select-page' | 'edit-fields';

const COLLECTION_SLUGS = [
  'resort_restaurants',
  'resort_activities', 
  'resort_amenities',
  'area_nassau_attractions',
  'area_local_restaurants',
  'area_transportation',
  'site_stats',
];

const COLLECTION_LABELS = {
  'resort_restaurants': 'Resort Restaurants',
  'resort_activities': 'Resort Activities',
  'resort_amenities': 'Resort Amenities', 
  'area_nassau_attractions': 'Nassau Attractions',
  'area_local_restaurants': 'Local Restaurants',
  'area_transportation': 'Transportation Options',
  'site_stats': 'Site Statistics',
};

type FieldDef = { id: string; label: string; placeholder?: string };
const PAGE_TEXT_FIELDS: { section: string; fields: FieldDef[] }[] = [
  {
    section: 'Info page',
    fields: [
      { id: 'info.hero.title', label: 'Hero title', placeholder: 'Essential Information' },
      { id: 'info.hero.subtitle', label: 'Hero subtitle', placeholder: 'Insider tips and practical details' },
      { id: 'info.emergency.title', label: 'Emergency title', placeholder: 'Need Help During Your Stay?' },
      { id: 'info.emergency.line1', label: 'Emergency line 1', placeholder: 'Owner Services: 1-888...' },
      { id: 'info.emergency.line2', label: 'Emergency line 2', placeholder: 'Hotel Extension: 38...' },
      { id: 'info.emergency.body', label: 'Emergency body', placeholder: 'Team is your best resource...' },
    ],
  },
  {
    section: 'Area page',
    fields: [
      { id: 'area.hero.title', label: 'Hero title', placeholder: 'Explore Nassau & Paradise Island' },
      { id: 'area.hero.subtitle', label: 'Hero subtitle' },
      { id: 'area.nassau.intro', label: 'Nassau intro' },
      { id: 'area.local.intro', label: 'Local favorites intro' },
      { id: 'area.transport.intro', label: 'Transportation intro' },
    ],
  },
  {
    section: 'Resort page',
    fields: [
      { id: 'resort.hero.title', label: 'Hero title' },
      { id: 'resort.hero.subtitle', label: 'Hero subtitle' },
      { id: 'resort.dining.intro', label: 'Dining intro' },
      { id: 'resort.activities.intro', label: 'Activities intro' },
      { id: 'resort.amenities.intro', label: 'Amenities intro' },
    ],
  },
];

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>('home');
  const [textEditStep, setTextEditStep] = useState<TextEditStep>('select-page');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [originalBlocks, setOriginalBlocks] = useState<Block[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>('site_stats');
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  

  const [seeding, setSeeding] = useState(false);
  // const client = useMemo(() => getBrowserSupabase(), []);

  useEffect(() => {
    setMounted(true);
    (async () => {
      const res = await fetch('/api/auth/status');
      const js = await res.json();
      setAuthed(Boolean(js.authed));
    })();
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="container py-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-blue mx-auto"></div>
          <p className="mt-4 text-gray-cool">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password }) });
    setLoading(false);
    if (res.ok) {
      setAuthed(true);
    } else {
      try {
        const j = await res.json();
        alert(j?.error || 'Login failed');
      } catch {
        alert('Login failed');
      }
    }
  }

  async function startTextEdit() {
    setMode('edit-text');
    setTextEditStep('select-page');
  }

  async function startListEdit() {
    setMode('edit-lists');
    setActiveSlug('site_stats');
    await loadItems('site_stats');
  }

  async function selectPageForEdit(pageSection: string) {
    setSelectedPage(pageSection);
    setTextEditStep('edit-fields');
    await loadBlocksForPage();
  }

  async function loadBlocksForPage() {
    const res = await fetch('/api/content/blocks?page=info');
    const data = await res.json();
    const blockData = data.data || [];
    setBlocks([...blockData]);
    setOriginalBlocks([...blockData]);
  }

  async function saveTextChanges() {
    const res = await fetch('/api/content/blocks', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ blocks }) });
    if (res.ok) {
      setMode('home');
      setTextEditStep('select-page');
      setSelectedPage('');
    } else {
      alert('Failed to save changes');
    }
  }

  function cancelTextChanges() {
    setBlocks([...originalBlocks]);
    setMode('home');
    setTextEditStep('select-page');
    setSelectedPage('');
  }

  async function loadItems(slug: string) {
    console.log('📥 LOADING ITEMS:', { slug });
    const timestamp = Date.now();
    const url = `/api/content/collections/${slug}?t=${timestamp}&bust=${Math.random()}`;
    console.log('🌐 Request URL:', url);
    
    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    console.log('📡 Load Response:', { status: res.status, ok: res.ok, timestamp });
    
    const js = await res.json();
    console.log('📋 Loaded data:', { 
      itemCount: js.items?.length || 0, 
      items: js.items,
      serverTimestamp: js.timestamp,
      serverTime: js.serverTime,
      nodeEnv: js.nodeEnv,
      clientTime: Date.now(),
      timeDiff: js.serverTime ? Date.now() - js.serverTime : 'unknown'
    });
    
    // Debug: Log current items vs new items with FULL details
    const currentItems = items.map(i => ({ 
      id: i.id, 
      name: i.data?.name, 
      description: typeof i.data?.description === 'string' ? i.data.description.substring(0, 50) + '...' : i.data?.description,
      fullDescription: i.data?.description
    }));
    const newItems = (js.items || []).map((i: any) => ({ 
      id: i.id, 
      name: i.data?.name, 
      description: typeof i.data?.description === 'string' ? i.data.description.substring(0, 50) + '...' : i.data?.description,
      fullDescription: i.data?.description
    }));
    
    console.log('🔍 BEFORE UPDATE - Current items:', currentItems);
    console.log('🔍 AFTER FETCH - New items:', newItems);
    
    // Check which items are missing/added
    const currentIds = new Set(currentItems.map((i: any) => i.id));
    const newIds = new Set(newItems.map((i: any) => i.id));
    const missingItems = currentItems.filter((i: any) => !newIds.has(i.id));
    const addedItems = newItems.filter((i: any) => !currentIds.has(i.id));
    
    console.log('❌ MISSING ITEMS after fetch:', missingItems);
    console.log('➕ ADDED ITEMS after fetch:', addedItems);
    
    // Check if data actually changed
    const itemsChanged = JSON.stringify(items) !== JSON.stringify(js.items || []);
    console.log('🔄 DATA ACTUALLY CHANGED:', itemsChanged);
    console.log('📊 ITEM COUNT CHANGED:', items.length, '→', (js.items || []).length);
    
    // Force new array reference with deep cloning to ensure React detects the change
    const freshItems = (js.items || []).map((item: any) => ({
      ...item,
      data: { ...item.data }, // Force new object references
      _refreshKey: Date.now() // Add unique key to force re-render
    }));
    setItems(freshItems);
    setForceRender(prev => prev + 1); // Force component re-render
    console.log('✅ Items state updated with deep cloned objects and refresh key');
  }

  function getDefaultItem(slug: string) {
    const defaults: Record<string, Record<string, unknown>> = {
      site_stats: { icon: 'utensils', value: '', label: '' },
      resort_restaurants: { name: '', type: '', description: '', link: '', status: 'active', priceRange: '$$', location: '', highlights: [] },
      resort_activities: { name: '', type: '', description: '', link: '', status: 'active', priceRange: 'included', location: '', ageGroup: 'all', highlights: [] },
      resort_amenities: { name: '', description: '', location: '', hours: '', status: 'active', link: '' },
      area_nassau_attractions: { name: '', type: '', description: '', link: '', status: 'active', priceRange: 'free', location: '', distance: '', highlights: [], transportOptions: [] },
      area_local_restaurants: { name: '', type: '', description: '', link: '', status: 'active', priceRange: '$', location: '', distance: '', highlights: [], localFavorite: false },
      area_transportation: { type: '', description: '', priceRange: '$$', duration: '', highlights: [], bookingInfo: '' },
    };
    return defaults[slug] || {};
  }

  async function addItem() {
    const newItem = { id: 'new', position: Date.now(), data: getDefaultItem(activeSlug) };
    setEditingItem(newItem);
    setShowAddModal(true);
  }

  async function saveNewItem(data: Record<string, unknown>) {
    setSaving(true);
    console.log('🔄 STARTING NEW ITEM CREATION:', { activeSlug, data });
    
    // Store original state for potential rollback
    const originalItems = [...items];
    
    // Create a temporary ID for optimistic update
    const tempId = `temp-${Date.now()}`;
    const tempItem: Item = {
      id: tempId,
      position: Date.now(),
      data: data
    };
    
    console.log('⚡ Adding optimistic item to UI:', tempItem);
    
    // OPTIMISTIC UPDATE: Add item to UI immediately
    const optimisticItems = [...items, tempItem];
    setItems(optimisticItems);
    
    // Close modal immediately so user sees the optimistic update
    setShowAddModal(false);
    setEditingItem(null);
    
    try {
      const res = await fetch(`/api/content/collections/${activeSlug}`, { 
        method: 'POST', 
        headers: { 'content-type': 'application/json' }, 
        body: JSON.stringify(data) 
      });
      
      console.log('📡 API Response:', { status: res.status, ok: res.ok });
      
      if (res.ok) {
        console.log('✅ Server creation successful - replacing temp item with real data');
        // Fetch fresh data to get the real item with proper ID
        await loadItems(activeSlug);
        console.log('✅ Fresh data loaded with real item ID');
      } else {
        // ROLLBACK: Server creation failed, remove optimistic item
        console.error('❌ Server creation failed - removing optimistic item');
        setItems(originalItems);
        const errorText = await res.text();
        console.error('❌ Server error details:', { status: res.status, error: errorText });
        alert(`Failed to save item: ${res.status} ${errorText}`);
      }
    } catch (error) {
      // ROLLBACK: Network error, remove optimistic item
      console.error('❌ Network error - removing optimistic item:', error);
      setItems(originalItems);
      alert('Failed to save item: Network error');
    } finally {
      setSaving(false);
      console.log('✅ New item creation completed');
    }
  }

  async function saveItem(id: string, newData: Record<string, unknown>) {
    setSaving(true);
    console.log('🔄 STARTING ITEM UPDATE:', { activeSlug, id, newData });
    
    // Store original state for potential rollback
    const originalItems = [...items];
    
    // Find the current item to get complete data
    const currentItem = items.find(item => item.id === id);
    if (!currentItem) {
      console.error('❌ Current item not found in state:', { id, itemsCount: items.length });
      alert('Error: Item not found in current state');
      setSaving(false);
      return;
    }
    
    console.log('📋 Current item data:', currentItem.data);
    console.log('🆕 New form data:', newData);
    
    // Create complete updated item data (merge current with new)
    const completeUpdatedData = { ...currentItem.data, ...newData };
    console.log('🔄 Complete updated data to send:', completeUpdatedData);
    
    // Close modal immediately 
    setEditingItem(null);
    console.log('🚪 Modal closed - preparing server update');
    
    const payload = { id, update: completeUpdatedData };
    console.log('📦 API Request payload:', payload);
    
    try {
      const res = await fetch(`/api/content/collections/${activeSlug}`, { 
        method: 'PUT', 
        headers: { 'content-type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      
      console.log('📡 API Response:', { status: res.status, ok: res.ok });
      
      if (res.ok) {
        console.log('✅ Server update successful - optimistic update confirmed');
        // Small delay to ensure database transaction is fully committed
        console.log('⏳ Waiting 500ms for database transaction to commit...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Try multiple refresh strategies to bypass caching
        console.log('🔄 Attempting fresh data fetch (attempt 1)...');
        await loadItems(activeSlug);
        
        // If item count is still wrong, try again with longer delay
        if (items.length !== (await (await fetch(`/api/content/collections/${activeSlug}?t=${Date.now()}&bypass=${Math.random()}`, { cache: 'no-store' })).json()).items?.length) {
          console.log('⚠️ Item count mismatch detected, trying again in 1 second...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          await loadItems(activeSlug);
        }
        
        console.log('✅ Fresh data loaded to confirm server state');
      } else {
        // Server update failed
        console.error('❌ Server update failed');
        const errorText = await res.text();
        console.error('❌ Server error details:', { status: res.status, error: errorText });
        alert(`Failed to save item: ${res.status} ${errorText}`);
      }
    } catch (error) {
      // Network error
      console.error('❌ Network error:', error);
      alert('Failed to save item: Network error');
    } finally {
      setSaving(false);
      console.log('✅ Save operation completed');
    }
  }

  async function deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      const res = await fetch(`/api/content/collections/${activeSlug}`, { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id }) });
      if (res.ok) await loadItems(activeSlug);
    }
  }

  async function moveItem(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) return;
    
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    
    setItems(newItems);
    await fetch(`/api/content/collections/${activeSlug}`, {
      method: 'PUT', 
      headers: { 'content-type': 'application/json' }, 
      body: JSON.stringify({ reorder: newItems.map(item => item.id) })
    });
  }

  async function seedInitialData() {
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed-collections', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await res.json();
      
      if (res.ok) {
        alert(`Success: ${result.message}`);
        await loadItems(activeSlug);
      } else {
        alert(`Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Failed to seed data: ${error}`);
    } finally {
      setSeeding(false);
    }
  }

  // Login screen
  if (!authed) {
    return (
      <div className="container py-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={login} className="card p-6">
            <label htmlFor="admin-password" className="block text-sm mb-2">Password</label>
            <input 
              id="admin-password"
              name="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              className="input w-full mb-4" 
              placeholder="Enter admin password"
            />
            <button disabled={loading} className="btn-primary w-full">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Edit/Add item modal - CHECK THIS BEFORE MODE CHECKS!
  if (editingItem || showAddModal) {

    const item = editingItem;
    const isNew = item?.id === 'new' || showAddModal;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {isNew ? 'Add New Item' : 'Edit Item'}
              </h2>
              <button 
                onClick={() => {
                  setEditingItem(null);
                  setShowAddModal(false);
                }}
                className="btn p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <ItemEditForm 
              slug={activeSlug}
              item={item}
              onSave={isNew ? saveNewItem : (data: Record<string, unknown>) => saveItem(item!.id, data)}
              onCancel={() => {
                setEditingItem(null);
                setShowAddModal(false);
              }}
              saving={saving}
            />
          </div>
        </div>
      </div>
    );
  }

  // Home screen - two main options
  if (mode === 'home') {
    return (
      <div className="container pt-24 pb-16" style={{marginTop: '80px'}}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
          <p className="text-lg text-gray-cool mb-12">Choose what you&apos;d like to edit:</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <button 
              onClick={startTextEdit}
              className="card p-8 hover:shadow-medium transition-all duration-300 text-left"
            >
              <div className="flex items-center mb-4">
                <Edit className="h-8 w-8 text-ocean-blue mr-3" />
                <h2 className="text-2xl font-semibold">Edit Text</h2>
              </div>
              <p className="text-gray-cool">
                Update page titles, descriptions, and other text content across the website.
              </p>
            </button>

            <button 
              onClick={startListEdit}
              className="card p-8 hover:shadow-medium transition-all duration-300 text-left"
            >
              <div className="flex items-center mb-4">
                <List className="h-8 w-8 text-ocean-blue mr-3" />
                <h2 className="text-2xl font-semibold">Edit Lists</h2>
              </div>
              <p className="text-gray-cool">
                Manage restaurants, activities, attractions, and other content lists.
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Text editing wizard
  if (mode === 'edit-text') {
    if (textEditStep === 'select-page') {
      return (
        <div className="container pt-24 pb-16" style={{marginTop: '80px'}}>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-8">
              <button onClick={() => setMode('home')} className="btn mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <h1 className="text-3xl font-bold">Edit Text Content</h1>
            </div>
            
            <p className="text-lg text-gray-cool mb-8">Select which page you&apos;d like to edit:</p>
            
            <div className="space-y-4">
              {PAGE_TEXT_FIELDS.map((section) => (
                <button
                  key={section.section}
                  onClick={() => selectPageForEdit(section.section)}
                  className="card p-6 w-full text-left hover:shadow-medium transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2">{section.section}</h3>
                  <p className="text-gray-cool">{section.fields.length} text fields to edit</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (textEditStep === 'edit-fields') {
      const pageFields = PAGE_TEXT_FIELDS.find(p => p.section === selectedPage)?.fields || [];
      
      return (
        <div className="container pt-24 pb-16" style={{marginTop: '80px'}}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <button onClick={() => setTextEditStep('select-page')} className="btn mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
                <h1 className="text-3xl font-bold">Editing: {selectedPage}</h1>
              </div>
              
              <div className="flex gap-3">
                <button onClick={cancelTextChanges} className="btn">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button onClick={saveTextChanges} className="btn-primary">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pageFields.map(({ id, label, placeholder }) => {
                const value = blocks.find((b) => b.id === id)?.value || '';
                const isLongText = id.includes('body') || id.includes('intro');
                
                return (
                  <div key={id} className={`card p-4 ${isLongText ? 'md:col-span-2' : ''}`}>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-dark mb-2">{label}</label>
                    {isLongText ? (
                      <textarea
                        id={id}
                        name={id}
                        className="input w-full h-24"
                        placeholder={placeholder}
                        defaultValue={value}
                        onChange={(e) => {
                          const v = e.target.value;
                          setBlocks((prev) => {
                            const next = [...prev];
                            const i = next.findIndex((b) => b.id === id);
                            if (i >= 0) next[i] = { id, value: v };
                            else next.push({ id, value: v });
                            return next;
                          });
                        }}
                      />
                    ) : (
                      <input
                        id={id}
                        name={id}
                        className="input w-full"
                        placeholder={placeholder}
                        defaultValue={value}
                        onChange={(e) => {
                          const v = e.target.value;
                          setBlocks((prev) => {
                            const next = [...prev];
                            const i = next.findIndex((b) => b.id === id);
                            if (i >= 0) next[i] = { id, value: v };
                            else next.push({ id, value: v });
                            return next;
                          });
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  // Lists editing interface
  if (mode === 'edit-lists') {
    return (
      <div className="container pt-24 pb-16" style={{marginTop: '80px'}}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button onClick={() => setMode('home')} className="btn mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <h1 className="text-3xl font-bold">Edit Content Lists</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                id="collection-selector"
                name="collection"
                className="input" 
                value={activeSlug} 
                onChange={async (e) => { 
                  setActiveSlug(e.target.value); 
                  await loadItems(e.target.value); 
                }}
              >
                {COLLECTION_SLUGS.map((slug) => (
                  <option key={slug} value={slug}>
                    {COLLECTION_LABELS[slug as keyof typeof COLLECTION_LABELS]}
                  </option>
                ))}
              </select>
              
              <button onClick={addItem} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
              
              <button 
                onClick={seedInitialData} 
                disabled={seeding}
                className="px-4 py-2 bg-green-100 border-2 border-green-500 text-green-700 rounded-lg hover:bg-green-200 font-medium disabled:opacity-50"
              >
                {seeding ? 'Seeding...' : '🌱 Seed Initial Data'}
              </button>
              
              <button 
                onClick={() => loadItems(activeSlug)} 
                className="px-4 py-2 bg-blue-100 border-2 border-blue-500 text-blue-700 rounded-lg hover:bg-blue-200 font-medium"
              >
                🔄 Force Refresh
              </button>
            </div>
            

          </div>

          <div className="grid gap-6" key={forceRender}>
            {items.map((item, index) => (
              <div key={`${item.id}-${(item as any)._refreshKey || 0}`} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {String(item.data?.name || item.data?.type || item.data?.label || `Item ${index + 1}`)}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className="btn p-2 disabled:opacity-50"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === items.length - 1}
                      className="btn p-2 disabled:opacity-50"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="btn text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-cool">
                  {(() => {
                    const desc = item.data?.description;
                    return desc && typeof desc === 'string' ? (
                      <p className="mb-2">{desc.substring(0, 100) + '...'}</p>
                    ) : null;
                  })()}
                  <div className="flex gap-4">
                    {(() => {
                      const location = item.data?.location;
                      return location && typeof location === 'string' ? (
                        <span>📍 {location}</span>
                      ) : null;
                    })()}
                    {(() => {
                      const priceRange = item.data?.priceRange;
                      return priceRange && typeof priceRange === 'string' ? (
                        <span>💰 {priceRange}</span>
                      ) : null;
                    })()}
                    {(() => {
                      const status = item.data?.status;
                      return status && typeof status === 'string' ? (
                        <span>🟢 {status}</span>
                      ) : null;
                    })()}
                  </div>
                </div>
              </div>
            ))}
            
            {items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-cool mb-4">No items in this collection yet.</p>
                <button onClick={addItem} className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Item
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }



  return null;
}

// Item edit form component
function ItemEditForm({ slug, item, onSave, onCancel, saving }: {
  slug: string;
  item: Item | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
  saving?: boolean;
}) {
  const [formData, setFormData] = useState(item?.data || {});
  const [initializedItemId, setInitializedItemId] = useState(item?.id);
  
  // Only reinitialize form data if we're editing a different item
  if (item?.id !== initializedItemId) {
    console.log('🎨 Form switching to new item - reinitializing:', { 
      oldItemId: initializedItemId, 
      newItemId: item?.id, 
      newData: item?.data 
    });
    setFormData(item?.data || {});
    setInitializedItemId(item?.id);
  }
  
  // Debug: Log form state (only when it actually changes)
  console.log('🎨 Form current state:', { slug, itemId: item?.id, formData });
  
  const updateField = (field: string, value: unknown) => {
    setFormData((prev: Record<string, unknown>) => ({ ...prev, [field]: value }));
  };

  // Helper to safely get string values
  const getStringValue = (field: string, defaultValue = '') => {
    const value = formData[field];
    return typeof value === 'string' ? value : defaultValue;
  };

  // Helper to safely get array values
  const getArrayValue = (field: string) => {
    const value = formData[field];
    return Array.isArray(value) ? value : [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 FORM SUBMITTED:', { slug, itemId: item?.id, formData });
    console.log('🎯 Final form data being sent:', JSON.stringify(formData, null, 2));
    onSave(formData);
  };

  if (slug === 'site_stats') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="icon" className="block text-sm font-medium mb-2">Icon</label>
            <select 
              id="icon"
              name="icon"
              className="input w-full" 
              value={getStringValue('icon', 'utensils')} 
              onChange={(e) => updateField('icon', e.target.value)}
            >
              <option value="utensils">Utensils</option>
              <option value="activity">Activity</option>
              <option value="map-pin">Map Pin</option>
              <option value="star">Star</option>
            </select>
          </div>
          <div>
            <label htmlFor="value" className="block text-sm font-medium mb-2">Value</label>
            <input 
              id="value"
              name="value"
              className="input w-full" 
              value={getStringValue('value')} 
              onChange={(e) => updateField('value', e.target.value)}
              placeholder="e.g., 20+"
            />
          </div>
          <div>
            <label htmlFor="label" className="block text-sm font-medium mb-2">Label</label>
            <input 
              id="label"
              name="label"
              className="input w-full" 
              value={getStringValue('label')} 
              onChange={(e) => updateField('label', e.target.value)}
              placeholder="e.g., Restaurants"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="btn" disabled={saving}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    );
  }

  // Generic form for other item types
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name field (most items have this) */}
        {slug !== 'area_transportation' && (
          <div className={slug === 'resort_amenities' ? 'md:col-span-2' : ''}>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <input 
              id="name"
              name="name"
              className="input w-full" 
              value={getStringValue('name')} 
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
        )}

        {/* Type field */}
        {(slug.includes('restaurants') || slug.includes('activities') || slug.includes('attractions') || slug === 'area_transportation') && (
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-2">Type</label>
            <input 
              id="type"
              name="type"
              className="input w-full" 
              value={getStringValue('type')} 
              onChange={(e) => updateField('type', e.target.value)}
              placeholder={slug === 'area_transportation' ? 'e.g., Taxi, Bus' : 'Enter type'}
              required
            />
          </div>
        )}

        {/* Status */}
        {slug !== 'area_transportation' && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2">Status</label>
            <select 
              id="status"
              name="status"
              className="input w-full" 
              value={getStringValue('status', 'active')} 
              onChange={(e) => updateField('status', e.target.value)}
            >
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>
        )}

        {/* Price Range */}
        {slug !== 'resort_amenities' && (
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium mb-2">Price Range</label>
            <select 
              id="priceRange"
              name="priceRange"
              className="input w-full" 
              value={getStringValue('priceRange', '$')} 
              onChange={(e) => updateField('priceRange', e.target.value)}
            >
              {slug.includes('nassau_attractions') && <option value="free">Free</option>}
              {slug.includes('activities') && <option value="included">Included</option>}
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              {slug.includes('restaurants') && <option value="$$$$">$$$$</option>}
            </select>
          </div>
        )}

        {/* Location */}
        {slug !== 'area_transportation' && (
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
            <input 
              id="location"
              name="location"
              className="input w-full" 
              value={getStringValue('location')} 
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="Enter location"
            />
          </div>
        )}

        {/* Hours (amenities only) */}
        {slug === 'resort_amenities' && (
          <div>
            <label htmlFor="hours" className="block text-sm font-medium mb-2">Hours</label>
            <input 
              id="hours"
              name="hours"
              className="input w-full" 
              value={getStringValue('hours')} 
              onChange={(e) => updateField('hours', e.target.value)}
              placeholder="e.g., 9am - 6pm"
            />
          </div>
        )}

        {/* Distance (area items) */}
        {slug.includes('area_') && slug !== 'area_transportation' && (
          <div>
            <label htmlFor="distance" className="block text-sm font-medium mb-2">Distance</label>
            <input 
              id="distance"
              name="distance"
              className="input w-full" 
              value={getStringValue('distance')} 
              onChange={(e) => updateField('distance', e.target.value)}
              placeholder="e.g., 5 min walk"
            />
          </div>
        )}

        {/* Duration (transportation) */}
        {slug === 'area_transportation' && (
          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-2">Duration</label>
            <input 
              id="duration"
              name="duration"
              className="input w-full" 
              value={getStringValue('duration')} 
              onChange={(e) => updateField('duration', e.target.value)}
              placeholder="e.g., 15 minutes"
            />
          </div>
        )}

        {/* Age Group (activities only) */}
        {slug === 'resort_activities' && (
          <div>
            <label htmlFor="ageGroup" className="block text-sm font-medium mb-2">Age Group</label>
            <select 
              id="ageGroup"
              name="ageGroup"
              className="input w-full" 
              value={getStringValue('ageGroup', 'all')} 
              onChange={(e) => updateField('ageGroup', e.target.value)}
            >
              <option value="all">All Ages</option>
              <option value="adults">Adults</option>
              <option value="kids">Kids</option>
              <option value="teens">Teens</option>
            </select>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
        <textarea 
          id="description"
          name="description"
          className="input w-full h-24" 
          value={getStringValue('description')} 
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Enter description"
          required
        />
      </div>

      {/* Highlights */}
      <div>
        <label htmlFor="highlights" className="block text-sm font-medium mb-2">
          {slug === 'area_local_restaurants' ? 'Specialties' : 'Highlights'}
        </label>
        <input 
          id="highlights"
          name="highlights"
          className="input w-full" 
          value={getArrayValue('highlights').join(', ')} 
          onChange={(e) => updateField('highlights', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
          placeholder="Enter comma-separated highlights"
        />
      </div>

      {/* Transport Options (attractions only) */}
      {slug === 'area_nassau_attractions' && (
        <div>
          <label htmlFor="transportOptions" className="block text-sm font-medium mb-2">Transport Options</label>
          <input 
            id="transportOptions"
            name="transportOptions"
            className="input w-full" 
            value={getArrayValue('transportOptions').join(', ')} 
            onChange={(e) => updateField('transportOptions', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
            placeholder="e.g., Walking, Taxi, Bus"
          />
        </div>
      )}

      {/* Booking Info (transportation only) */}
      {slug === 'area_transportation' && (
        <div>
          <label htmlFor="bookingInfo" className="block text-sm font-medium mb-2">Booking Info</label>
          <textarea 
            id="bookingInfo"
            name="bookingInfo"
            className="input w-full h-20" 
            value={getStringValue('bookingInfo')} 
            onChange={(e) => updateField('bookingInfo', e.target.value)}
            placeholder="How to book or contact information"
          />
        </div>
      )}

      {/* Link */}
      <div>
        <label htmlFor="link" className="block text-sm font-medium mb-2">Link (optional)</label>
        <input 
          id="link"
          name="link"
          className="input w-full" 
          type="url"
          value={getStringValue('link')} 
          onChange={(e) => updateField('link', e.target.value)}
          placeholder="https://..."
        />
      </div>

      {/* Local Favorite checkbox (local restaurants only) */}
      {slug === 'area_local_restaurants' && (
        <div>
          <label htmlFor="localFavorite" className="flex items-center gap-2">
            <input 
              id="localFavorite"
              name="localFavorite"
              type="checkbox" 
              checked={Boolean(formData.localFavorite)} 
              onChange={(e) => updateField('localFavorite', e.target.checked)}
            />
            <span className="text-sm font-medium">Local Favorite</span>
          </label>
        </div>
      )}
      
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button type="button" onClick={onCancel} className="btn" disabled={saving}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}


