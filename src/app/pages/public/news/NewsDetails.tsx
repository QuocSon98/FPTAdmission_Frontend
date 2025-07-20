// import React, { useState, useEffect } from 'react';
// import { Calendar, Eye, Share2, Bookmark, Clock, User, ArrowLeft, Facebook, Twitter, Linkedin, Mail, Printer as Print } from 'lucide-react';

// interface NewsDetailsProps {
//   newsItem: NewsItem;
// }

// interface NewsItem {
//   id: string;
//   topic: string;
//   htmlContent: string;
//   deltaContent: string;
//   stamp: string;
//   view: number;
//   thumbnail: string;
//   category_name: string;
// }

// const NewsDetails: React.FC<NewsDetailsProps> = ({ newsItem }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [readingProgress, setReadingProgress] = useState(0);
//   const [shareOpen, setShareOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset;
//       const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (scrollTop / docHeight) * 100;
//       setReadingProgress(progress);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatViews = (views: number) => {
//     if (views >= 1000000) {
//       return `${(views / 1000000).toFixed(1)}M`;
//     } else if (views >= 1000) {
//       return `${(views / 1000).toFixed(1)}K`;
//     }
//     return views.toString();
//   };

//   const shareUrl = window.location.href;
//   const shareTitle = newsItem.topic;

//   const handleShare = (platform: string) => {
//     const urls = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
//       twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
//       email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
//     };
    
//     if (platform === 'print') {
//       window.print();
//     } else if (urls[platform as keyof typeof urls]) {
//       window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Reading Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//         <div 
//           className="h-full bg-blue-600 transition-all duration-150 ease-out"
//           style={{ width: `${readingProgress}%` }}
//         />
//       </div>

//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button 
//               onClick={() => window.history.back()}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ArrowLeft size={20} />
//               <span className="hidden sm:inline">Back to News</span>
//             </button>
            
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setIsBookmarked(!isBookmarked)}
//                 className={`p-2 rounded-full transition-colors ${
//                   isBookmarked 
//                     ? 'bg-blue-100 text-blue-600' 
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
//               </button>
              
//               <div className="relative">
//                 <button
//                   onClick={() => setShareOpen(!shareOpen)}
//                   className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//                 >
//                   <Share2 size={20} />
//                 </button>
                
//                 {shareOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-10">
//                     <button
//                       onClick={() => handleShare('facebook')}
//                       className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
//                     >
//                       <Facebook size={16} className="text-blue-600" />
//                       Share on Facebook
//                     </button>
//                     <button
//                       onClick={() => handleShare('twitter')}
//                       className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
//                     >
//                       <Twitter size={16} className="text-blue-400" />
//                       Share on Twitter
//                     </button>
//                     <button
//                       onClick={() => handleShare('linkedin')}
//                       className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
//                     >
//                       <Linkedin size={16} className="text-blue-700" />
//                       Share on LinkedIn
//                     </button>
//                     <button
//                       onClick={() => handleShare('email')}
//                       className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
//                     >
//                       <Mail size={16} className="text-gray-600" />
//                       Share via Email
//                     </button>
//                     <hr className="my-2" />
//                     <button
//                       onClick={() => handleShare('print')}
//                       className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
//                     >
//                       <Print size={16} className="text-gray-600" />
//                       Print Article
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Article Content */}
//       <main className="max-w-4xl mx-auto px-4 py-8">
//         <article className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {/* Article Header */}
//           <div className="p-6 sm:p-8">
//             <div className="flex flex-wrap items-center gap-4 mb-6">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                 {newsItem.category_name}
//               </span>
//               <div className="flex items-center gap-4 text-sm text-gray-500">
//                 <div className="flex items-center gap-1">
//                   <Calendar size={16} />
//                   <span>{formatDate(newsItem.stamp)}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Eye size={16} />
//                   <span>{formatViews(newsItem.view)} views</span>
//                 </div>
//               </div>
//             </div>

//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
//               {newsItem.topic}
//             </h1>

//             {/* Thumbnail */}
//             {newsItem.thumbnail && (
//               <div className="mb-8">
//                 <img
//                   src={newsItem.thumbnail}
//                   alt={newsItem.topic}
//                   className="w-full h-64 sm:h-80 object-cover rounded-lg"
//                 />
//               </div>
//             )}

//             {/* Article Content */}
//             <div className="prose prose-lg max-w-none">
//               <div 
//                 className="text-gray-800 leading-relaxed"
//                 dangerouslySetInnerHTML={{ __html: newsItem.htmlContent }}
//               />
//             </div>
//           </div>

//           {/* Article Footer */}
//           <div className="border-t bg-gray-50 px-6 sm:px-8 py-6">
//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <Clock size={16} />
//                 <span>Last updated: {formatDate(newsItem.stamp)}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <User size={16} />
//                 <span>News Team</span>
//               </div>
//             </div>
//           </div>
//         </article>

//         {/* Related Articles */}
//         <section className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
//                 <div className="h-48 bg-gray-200"></div>
//                 <div className="p-4">
//                   <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
//                     Technology
//                   </span>
//                   <h3 className="font-semibold text-gray-900 mb-2">
//                     Related Article Title {i}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-3">
//                     Brief description of the related article content...
//                   </p>
//                   <div className="flex items-center gap-2 text-xs text-gray-500">
//                     <Calendar size={12} />
//                     <span>2 days ago</span>
//                     <Eye size={12} />
//                     <span>1.2K views</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* Click outside to close share menu */}
//       {shareOpen && (
//         <div 
//           className="fixed inset-0 z-5"
//           onClick={() => setShareOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default NewsDetails;

import React from 'react';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark, Eye, ThumbsUp, MessageCircle, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';

interface ReadMorePageProps {
  onBack: () => void;
  articleId: number;
}

const ReadMorePage: React.FC<ReadMorePageProps> = ({ onBack, articleId }) => {
  // Sample article data - in a real app, this would come from props or API
  const article = {
    id: 1,
    title: "FPT University Opens Spring 2025 Application",
    subtitle: "Early bird discount available until December 31st with comprehensive support for international students",
    content: `
      <p>FPT University is excited to announce that applications for the Spring 2025 semester are now officially open. This marks an important milestone for prospective students who are looking to begin their academic journey in one of Vietnam's leading technology universities.</p>
      
      <h2>Application Timeline and Key Dates</h2>
      <p>The application period will remain open until March 15, 2025, giving students ample time to prepare and submit their applications. However, we strongly encourage early applications to take advantage of our early bird discount program.</p>
      
      <p>Students who submit their complete applications before December 31, 2024, will be eligible for a 15% discount on their first semester tuition fees. This significant saving can help reduce the financial burden on families while ensuring students secure their spot in their preferred programs.</p>
      
      <h2>Enhanced Support for International Students</h2>
      <p>Recognizing the growing interest from international students, FPT University has expanded its support services to ensure a smooth application and transition process. Our dedicated international admissions team is available to assist with:</p>
      
      <ul>
        <li>Document verification and translation services</li>
        <li>Visa application guidance and support</li>
        <li>Accommodation assistance and campus orientation</li>
        <li>English language support programs</li>
        <li>Cultural integration workshops</li>
      </ul>
      
      <h2>Program Offerings and Specializations</h2>
      <p>The Spring 2025 intake will feature all of our flagship programs, including Computer Science, Information Technology, Business Administration, Engineering, and Digital Marketing. Each program has been updated to reflect the latest industry trends and technological advancements.</p>
      
      <p>Our Computer Science program, in particular, has introduced new specializations in Artificial Intelligence, Cybersecurity, and Data Science to meet the growing demand for these skills in the job market.</p>
      
      <h2>Application Requirements</h2>
      <p>Prospective students will need to submit the following documents as part of their application:</p>
      
      <ul>
        <li>Completed online application form</li>
        <li>Official high school transcripts</li>
        <li>English proficiency test scores (IELTS, TOEFL, or equivalent)</li>
        <li>Personal statement and essay</li>
        <li>Letters of recommendation</li>
        <li>Portfolio (for design and creative programs)</li>
      </ul>
      
      <h2>Financial Aid and Scholarships</h2>
      <p>In addition to the early bird discount, FPT University offers various scholarship opportunities for deserving students. Merit-based scholarships are available for students with outstanding academic records, while need-based financial aid ensures that financial constraints don't prevent talented students from pursuing their education.</p>
      
      <p>International students may also be eligible for special scholarship programs designed to promote cultural diversity on campus.</p>
      
      <h2>Next Steps</h2>
      <p>Students interested in applying should visit our online application portal and create their account to begin the process. Our admissions counselors are available for virtual consultations to help guide students through the application process and answer any questions they may have.</p>
      
      <p>We encourage all prospective students to attend our upcoming information sessions and virtual campus tours to get a better understanding of what FPT University has to offer.</p>
    `,
    author: "Dr. Sarah Johnson",
    authorRole: "Director of Admissions",
    authorImage: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=150",
    date: "2024-12-15",
    category: "Admission",
    readTime: "8 min read",
    views: 2847,
    likes: 156,
    comments: 23,
    image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Admission", "Spring 2025", "Early Bird", "International Students", "Scholarships"]
  };

  const relatedArticles = [
    {
      id: 2,
      title: "New Scholarship Programs for International Students",
      excerpt: "FPT University announces expanded scholarship opportunities for international students with up to 50% tuition coverage.",
      date: "2024-12-12",
      category: "Scholarships",
      readTime: "4 min read",
      image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Virtual Campus Tour Now Available",
      excerpt: "Experience FPT University from anywhere with our new 360° virtual campus tour featuring all facilities and departments.",
      date: "2024-12-10",
      category: "Campus Life",
      readTime: "2 min read",
      image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      title: "Updated Admission Requirements for 2025",
      excerpt: "Review the latest admission requirements and prepare your application documents for the upcoming academic year.",
      date: "2024-12-08",
      category: "Admission",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Admission': 'bg-blue-100 text-blue-800',
      'Scholarships': 'bg-green-100 text-green-800',
      'Campus Life': 'bg-purple-100 text-purple-800',
      'Alumni': 'bg-orange-100 text-orange-800',
      'Partnerships': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // You could add a toast notification here
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
              <Tag className="h-3 w-3 mr-1" />
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {article.subtitle}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(article.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime}
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {article.views.toLocaleString()} views
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-center">
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">{article.author}</p>
                <p className="text-sm text-gray-600">{article.authorRole}</p>
              </div>
            </div>
            
            {/* Social Actions */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {article.likes}
              </button>
              <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                <MessageCircle className="h-4 w-4 mr-1" />
                {article.comments}
              </button>
              <button className="text-gray-500 hover:text-blue-600 transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <div key={relatedArticle.id} className="group cursor-pointer">
                <div className="aspect-w-16 aspect-h-9 mb-3">
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedArticle.category)}`}>
                    {relatedArticle.category}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {relatedArticle.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {relatedArticle.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(relatedArticle.date).toLocaleDateString()}</span>
                  <span>{relatedArticle.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ReadMorePage;