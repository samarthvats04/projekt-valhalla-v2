"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

function Forum() {
  const [selectedThread, setSelectedThread] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState({});

  const categories = ["All", "Progress Reports", "Technique & Form", "Nutrition", "Success Stories", "General Discussion"];

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getCurrentUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch threads from Supabase with username JOIN
  const fetchThreads = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          profiles!forum_threads_user_id_fkey(username)
        `)
        .order('last_activity', { ascending: false });
      
      if (error) {
        console.error('Error fetching threads:', error);
        throw error;
      }
      
      // Transform data to include username directly
      const threadsWithUsernames = data.map(thread => ({
        ...thread,
        author: thread.profiles?.username || 'Unknown User'
      }));
      
      setThreads(threadsWithUsernames || []);
    } catch (error) {
      console.error('Fetch threads error:', error);
      alert('Error loading threads: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch replies for a specific thread with username JOIN
  const fetchReplies = async (threadId) => {
    try {
      const { data, error } = await supabase
        .from('forum_replies')
        .select(`
          *,
          profiles!forum_replies_user_id_fkey(username)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      // Transform data to include username
      const repliesWithUsernames = (data || []).map(reply => ({
        ...reply,
        author: reply.profiles?.username || 'Unknown User'
      }));
      
      return repliesWithUsernames;
    } catch (error) {
      console.error('Error fetching replies:', error);
      return [];
    }
  };

  // Handle thread selection and load replies
  const handleThreadClick = async (thread) => {
    try {
      // Disable body scroll completely
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      // Increment view count
      const { error: updateError } = await supabase
        .from('forum_threads')
        .update({ views: thread.views + 1 })
        .eq('id', thread.id);
      
      if (updateError) {
        console.error('Error updating views:', updateError);
      }

      // Fetch replies
      const replies = await fetchReplies(thread.id);
      
      // Update local state with incremented views
      const updatedThread = { ...thread, views: thread.views + 1, posts: replies };
      setSelectedThread(updatedThread);
      
      // Update the thread in the threads list
      setThreads(prevThreads => 
        prevThreads.map(t => t.id === thread.id ? { ...t, views: t.views + 1 } : t)
      );
    } catch (error) {
      console.error('Error handling thread click:', error);
      const replies = await fetchReplies(thread.id);
      setSelectedThread({ ...thread, posts: replies });
      // Still lock scroll even if error
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim() || formData.title.trim().length < 5) {
      errors.title = "Title must be at least 5 characters";
    } else if (formData.title.length > 100) {
      errors.title = "Title must be less than 100 characters";
    }
    
    if (!formData.content.trim() || formData.content.trim().length < 20) {
      errors.content = "Content must be at least 20 characters";
    } else if (formData.content.length > 2000) {
      errors.content = "Content must be less than 2000 characters";
    }
    
    if (!formData.category) {
      errors.category = "Please select a category";
    }
    
    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmitThread = async () => {
    if (!currentUser) {
      alert('You must be logged in to create a thread');
      return;
    }

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    
    try {
      const threadData = {
        user_id: currentUser.id,
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        replies: 0,
        views: 0,
        last_activity: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('forum_threads')
        .insert([threadData])
        .select();
      
      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      // Reset form
      setFormData({ title: '', content: '', category: '' });
      setFormErrors({});
      setShowCreateForm(false);
      
      // Refresh threads
      await fetchThreads();
      
      alert('Your thread has been created successfully!');
    } catch (error) {
      console.error('Submit error details:', error);
      alert('Error creating thread: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!currentUser) {
      alert('You must be logged in to reply');
      return;
    }

    if (!replyContent.trim()) {
      alert('Please enter a reply');
      return;
    }

    if (!selectedThread) return;

    setSubmittingReply(true);
    
    try {
      const replyData = {
        thread_id: selectedThread.id,
        user_id: currentUser.id,
        content: replyContent.trim()
      };
      
      const { error } = await supabase
        .from('forum_replies')
        .insert([replyData]);
      
      if (error) throw error;

      // Refresh replies and threads
      const replies = await fetchReplies(selectedThread.id);
      setSelectedThread(prev => ({ ...prev, posts: replies, replies: prev.replies + 1 }));
      setReplyContent('');
      await fetchThreads();
      
      alert('Reply posted successfully!');
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('Error posting reply: ' + error.message);
    } finally {
      setSubmittingReply(false);
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const filteredThreads = activeCategory === "All" 
    ? threads 
    : threads.filter(thread => thread.category === activeCategory);

  const toggleReplyExpansion = (replyId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [replyId]: !prev[replyId]
    }));
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const closeThreadModal = () => {
    setSelectedThread(null);
    setExpandedReplies({});
    setReplyContent('');
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.documentElement.style.overflow = 'unset';
  };

  const closeCreateModal = () => {
    setShowCreateForm(false);
    setFormData({ title: '', content: '', category: '' });
    setFormErrors({});
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.documentElement.style.overflow = 'unset';
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  // Enable body scroll when modals are open
  useEffect(() => {
    if (showCreateForm) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
    }
  }, [showCreateForm]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <section id="forum" className="bg-[#000] text-white scroll-mt-24 py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Corner spinning images with overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-black/60"></div>
          
          <div className="absolute -top-1/2 -left-1/2 w-full h-full">
            <img 
              src="/assets/rune-wheel.png" 
              alt="" 
              className="w-full h-full object-contain animate-spin-slow-ccw opacity-30"
              style={{ animationDuration: '45s' }}
            />
          </div>
          
          <div className="absolute -top-1/2 -right-1/2 w-full h-full">
            <img 
              src="/assets/rune-wheel.png" 
              alt="" 
              className="w-full h-full object-contain animate-spin-slow-cw opacity-30"
              style={{ animationDuration: '45s' }}
            />
          </div>
          
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full">
            <img 
              src="/assets/rune-wheel.png" 
              alt="" 
              className="w-full h-full object-contain animate-spin-slow-ccw opacity-30"
              style={{ animationDuration: '45s' }}
            />
          </div>
          
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full">
            <img 
              src="/assets/rune-wheel.png" 
              alt="" 
              className="w-full h-full object-contain animate-spin-slow-cw opacity-30"
              style={{ animationDuration: '45s' }}
            />
          </div>
        </div>

        <style>{`
          @keyframes spin-slow-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-slow-ccw {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          
          .animate-spin-slow-cw {
            animation: spin-slow-cw linear infinite;
          }
          
          .animate-spin-slow-ccw {
            animation: spin-slow-ccw linear infinite;
          }
        `}</style>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-3 sm:mb-4 tracking-wide">
            Hall of Echoes
          </h2>
          <p className="text-base sm:text-lg text-gray-300 text-center mb-6 sm:mb-8 px-2">
            Share your battles, your victories, your feedback.<br className="hidden sm:block" />
            Your experience shapes what we build next. Real talk only.
          </p>

          {/* Create Thread Button */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              onClick={() => {
                if (!currentUser) {
                  alert('You must be logged in to create a thread');
                  return;
                }
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.documentElement.style.overflow = 'hidden';
                setShowCreateForm(true);
              }}
              className="bg-white text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-gray-200 transition duration-300 text-sm sm:text-base"
            >
              + Create New Thread
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 px-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold transition-all duration-300 text-xs sm:text-base ${
                  activeCategory === category
                    ? 'bg-white text-black'
                    : 'bg-[#18181b] text-gray-300 hover:bg-[#27272a]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Forum Threads List */}
          <div className="mb-6 sm:mb-8">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading threads...</p>
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No threads yet. Be the first to create one!</p>
              </div>
            ) : (
              <div 
                className="space-y-3 sm:space-y-4 max-h-[600px] overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#27272a #0a0a0a'
                }}
              >
                <style>{`
                  .space-y-3::-webkit-scrollbar,
                  .space-y-4::-webkit-scrollbar {
                    width: 8px;
                  }
                  .space-y-3::-webkit-scrollbar-track,
                  .space-y-4::-webkit-scrollbar-track {
                    background: #0a0a0a;
                    border-radius: 10px;
                  }
                  .space-y-3::-webkit-scrollbar-thumb,
                  .space-y-4::-webkit-scrollbar-thumb {
                    background: #27272a;
                    border-radius: 10px;
                    transition: background 0.3s ease;
                  }
                  .space-y-3::-webkit-scrollbar-thumb:hover,
                  .space-y-4::-webkit-scrollbar-thumb:hover {
                    background: #3a3a3a;
                  }
                `}</style>
                {filteredThreads.slice(0, 6).map((thread) => (
                  <motion.div
                    key={thread.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#18181b] rounded-lg p-4 sm:p-6 hover:bg-[#27272a] transition-all duration-300 cursor-pointer border border-gray-800 hover:border-gray-700"
                    onClick={() => handleThreadClick(thread)}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white hover:text-gray-300 transition">
                          {thread.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                          <span className="bg-[#27272a] px-2 sm:px-3 py-1 rounded-full">{thread.category}</span>
                          <span>by {thread.author}</span>
                          <span className="hidden sm:inline">{getTimeAgo(thread.last_activity)}</span>
                        </div>
                        <span className="text-xs text-gray-400 mt-1 block sm:hidden">{getTimeAgo(thread.last_activity)}</span>
                      </div>
                      <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 sm:ml-4">
                        <div className="text-center">
                          <div className="font-bold text-white">{thread.replies}</div>
                          <div>replies</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-white">{thread.views}</div>
                          <div>views</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Create Thread Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={closeCreateModal}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#18181b] rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-4 sm:p-6 md:p-8 my-4"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#27272a #0a0a0a'
              }}
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Create New Thread</h2>
                <button
                  onClick={closeCreateModal}
                  className="text-gray-400 hover:text-white text-2xl sm:text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Category Dropdown */}
                <div className="relative">
                  <label htmlFor="category" className="block text-xs sm:text-sm font-semibold mb-2 text-white">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => !submitting && setShowCategoryDropdown(prev => !prev)}
                      disabled={submitting}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 pr-4 border border-gray-700 bg-[#0a0a0a] text-white rounded-lg shadow-sm text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      <span className={formData.category ? "text-white" : "text-gray-500"}>
                        {formData.category || "Select a category"}
                      </span>
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${showCategoryDropdown ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {showCategoryDropdown && !submitting && (
                        <motion.ul
                          key="category-dropdown"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 w-full bg-[#27272a] mt-1 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                          {categories.filter(cat => cat !== "All").map(option => (
                            <li
                              key={option}
                              onClick={() => {
                                handleInputChange('category', option);
                                setShowCategoryDropdown(false);
                              }}
                              className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-[#3a3a3a] cursor-pointer text-xs sm:text-sm text-white transition-colors"
                            >
                              {option}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  {formErrors.category && (
                    <p className="text-red-400 text-sm mt-2">{formErrors.category}</p>
                  )}
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2 text-white">
                    Thread Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter a descriptive title..."
                    maxLength={100}
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                    disabled={submitting}
                  />
                  {formErrors.title && (
                    <p className="text-red-400 text-sm mt-2">{formErrors.title}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">{formData.title.length}/100</p>
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2 text-white">
                    Content <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Share your thoughts, questions, or progress..."
                    maxLength={2000}
                    className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none"
                    rows={6}
                    disabled={submitting}
                  />
                  {formErrors.content && (
                    <p className="text-red-400 text-sm mt-2">{formErrors.content}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">{formData.content.length}/2000</p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitThread}
                  disabled={submitting}
                  className="w-full bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {submitting ? 'Posting...' : 'Post Thread'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thread Detail Modal */}
      <AnimatePresence>
        {selectedThread && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={closeThreadModal}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#18181b] rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col p-4 sm:p-6 md:p-8 my-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6 flex-shrink-0">
                <div className="flex-1 pr-2">
                  <span className="bg-[#27272a] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3 inline-block">
                    {selectedThread.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-white">{selectedThread.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                    <span>by {selectedThread.author}</span>
                    <span>{getTimeAgo(selectedThread.last_activity)}</span>
                  </div>
                </div>
                <button
                  onClick={closeThreadModal}
                  className="text-gray-400 hover:text-white text-2xl sm:text-3xl leading-none flex-shrink-0"
                >
                  ×
                </button>
              </div>

              {/* Scrollable content area */}
              <div 
                className="overflow-y-auto flex-1 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#27272a #0a0a0a'
                }}
              >
                {/* Original Post */}
                <div className="bg-[#0a0a0a] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedThread.content}</p>
                </div>

                {/* Replies */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Replies ({selectedThread.replies})</h3>
                  {selectedThread.posts && selectedThread.posts.length > 0 ? (
                    selectedThread.posts.map((post) => {
                      const isLongReply = post.content.length > 150;
                      const isExpanded = expandedReplies[post.id];
                      const displayContent = isLongReply && !isExpanded 
                        ? truncateText(post.content) 
                        : post.content;

                      return (
                        <div key={post.id} className="bg-[#0a0a0a] rounded-lg p-4 sm:p-6 border-l-4 border-gray-700">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0 mb-2 sm:mb-3">
                            <span className="font-semibold text-sm sm:text-base text-white">{post.author}</span>
                            <span className="text-xs sm:text-sm text-gray-400">{getTimeAgo(post.created_at)}</span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">{displayContent}</p>
                          {isLongReply && (
                            <button
                              onClick={() => toggleReplyExpansion(post.id)}
                              className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm mt-2 font-semibold"
                            >
                              {isExpanded ? 'Show less' : 'Show more'}
                            </button>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-400 text-center py-4 text-sm sm:text-base">No replies yet. Be the first to reply!</p>
                  )}
                </div>

                {/* Reply Input */}
                {currentUser ? (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
                    <textarea
                      placeholder="Write your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 sm:p-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none"
                      rows={4}
                      disabled={submittingReply}
                    />
                    <button 
                      onClick={handleSubmitReply}
                      disabled={submittingReply}
                      className="mt-3 sm:mt-4 bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      {submittingReply ? 'Posting...' : 'Post Reply'}
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
                    <p className="text-gray-400 text-center py-4">You must be logged in to reply</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Forum;