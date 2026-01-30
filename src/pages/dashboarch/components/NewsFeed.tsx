import React, { useState, useRef } from 'react';
import { Avatar, Tag, Button, Typography, Image, Input, Modal, Statistic, Row, Col, type InputRef } from 'antd';
import { motion } from 'framer-motion';
import anhngap1 from '../../../assets/anhngap1.png';
import anhngap2 from '../../../assets/anhngap2.png';
import anhngap3 from '../../../assets/anhngap3.png';
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock, 
  Share2,
  Send,
  User,
  Award,
  Calendar,
  ShieldCheck
} from 'lucide-react';

const { Text, Paragraph, Title } = Typography;

interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface NewsItem {
  id: number;
  user: {
    name: string;
    avatar: string;
    role?: string;
  };
  content: string;
  image?: string;
  location: string;
  status: 'approved' | 'pending' | 'resolved';
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

const mockUserStats = {
  reports: 15,
  helpful: 42,
  reputation: 98
};

const UserProfileModal = ({ user, open, onClose }: { user: any, open: boolean, onClose: () => void }) => {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      className="rounded-2xl overflow-hidden"
    >
      <div className="flex flex-col items-center pt-6 pb-2">
        <div className="relative mb-4">
          <Avatar src={user.avatar} size={100} className="border-4 border-white shadow-lg" />
          {user.role && (
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-md border-2 border-white">
              <ShieldCheck size={16} />
            </div>
          )}
        </div>
        
        <Title level={4} className="!m-0 text-slate-800">{user.name}</Title>
        <Text className="text-slate-500 mb-4">{user.role || 'Thành viên tích cực'}</Text>
        
        <div className="flex gap-2 mb-6">
          <Tag icon={<Calendar size={12} />} color="default">Tham gia 2023</Tag>
          <Tag icon={<MapPin size={12} />} color="default">TP.HCM</Tag>
        </div>

        <div className="w-full bg-slate-50 rounded-xl p-4 mb-6">
          <Row gutter={16} className="text-center">
            <Col span={8}>
              <Statistic 
                title={<span className="text-xs text-slate-500">Đã báo cáo</span>}
                value={mockUserStats.reports} 
                formatter={(value) => <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{value}</span>}
              />
            </Col>
            <Col span={8} className="border-l border-r border-slate-200">
              <Statistic 
                title={<span className="text-xs text-slate-500">Hữu ích</span>}
                value={mockUserStats.helpful} 
                formatter={(value) => <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>{value}</span>}
              />
            </Col>
            <Col span={8}>
              <Statistic 
                title={<span className="text-xs text-slate-500">Uy tín</span>}
                value={mockUserStats.reputation} 
                formatter={(value) => <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>{value}</span>}
                suffix={<Award size={14} className="inline text-yellow-500 mb-1" />}
              />
            </Col>
          </Row>
        </div>

        <div className="w-full">
          <Text strong className="block mb-3 text-slate-700">Hoạt động gần đây</Text>
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-slate-400" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <Text className="block text-sm font-medium truncate">Cảnh báo ngập tại Quận {i + 1}</Text>
                  <Text className="block text-xs text-slate-400">{i + 2} ngày trước • Đã duyệt</Text>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </Modal>
  );
};

const mockNews: NewsItem[] = [
  {
    id: 1,
    user: {
      name: 'Nguyễn Văn A',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      role: 'Cư dân'
    },
    content: 'Đường Nguyễn Hữu Cảnh hiện tại đang ngập rất sâu, mọi người chú ý tránh đi qua đoạn này nhé. Nước đã tràn vào nhà dân.',
    image: anhngap1,
    location: 'Đường Nguyễn Hữu Cảnh, Q. Bình Thạnh',
    status: 'approved',
    timestamp: '10 phút trước',
    likes: 45,
    isLiked: false,
    comments: [
      { id: 1, user: 'Trần Thị B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', content: 'Cảm ơn bác đã thông báo!', timestamp: '5 phút trước', likes: 2, isLiked: false },
      { id: 2, user: 'Lê Văn C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', content: 'Khu này mưa là ngập, chán ghê.', timestamp: '2 phút trước', likes: 5, isLiked: true }
    ]
  },
  {
    id: 2,
    user: {
      name: 'Phạm Thị D',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sorelle',
      role: 'Cư dân tích cực'
    },
    content: 'Cống thoát nước tại ngã tư Hàng Xanh bị rác chặn dòng chảy. Đã báo cáo lên phường để xử lý.',
    image: anhngap2,
    location: 'Ngã tư Hàng Xanh, Q. Bình Thạnh',
    status: 'resolved',
    timestamp: '30 phút trước',
    likes: 128,
    isLiked: true,
    comments: []
  },
  {
    id: 3,
    user: {
      name: 'Hoàng Văn E',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    },
    content: 'Triều cường đang lên cao tại khu vực Quận 7, đường Trần Xuân Soạn bắt đầu ngập nhẹ.',
    image: anhngap3,
    location: 'Đường Trần Xuân Soạn, Quận 7',
    status: 'approved',
    timestamp: '1 giờ trước',
    likes: 67,
    isLiked: false,
    comments: [
      { id: 3, user: 'Ngô Thị F', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo', content: 'Chiều nay chắc kẹt xe dữ lắm đây.', timestamp: '45 phút trước', likes: 0, isLiked: false }
    ]
  },
  {
    id: 4,
    user: {
      name: 'Đội Cứu Hộ Sài Gòn',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rescue',
      role: 'Tổ chức'
    },
    content: 'Chúng tôi đang hỗ trợ kéo xe chết máy miễn phí tại khu vực đường Võ Văn Ngân, Thủ Đức. Ai cần hỗ trợ liên hệ 0909.xxx.xxx.',
    image: anhngap1,
    location: 'Võ Văn Ngân, TP. Thủ Đức',
    status: 'approved',
    timestamp: '2 giờ trước',
    likes: 542,
    isLiked: true,
    comments: [
      { id: 4, user: 'User123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User', content: 'Tuyệt vời quá các anh ơi! ❤️', timestamp: '1 giờ trước', likes: 12, isLiked: true }
    ]
  },
  {
    id: 5,
    user: {
      name: 'Nguyễn Văn G',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
    },
    content: 'Cây đổ chắn ngang đường tại công viên Gia Định do mưa lớn kèm gió giật mạnh. Mọi người chú ý quan sát.',
    image: anhngap2,
    location: 'Công viên Gia Định, Q. Gò Vấp',
    status: 'resolved',
    timestamp: '3 giờ trước',
    likes: 89,
    isLiked: false,
    comments: []
  },
  {
    id: 6,
    user: {
      name: 'Lê Thị H',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella',
    },
    content: 'Mưa tạnh rồi nhưng nước rút khá chậm ở khu vực Bến xe Miền Đông cũ.',
    location: 'Bến xe Miền Đông, Q. Bình Thạnh',
    status: 'approved',
    timestamp: '4 giờ trước',
    likes: 34,
    isLiked: false,
    comments: []
  }
];

const NewsFeedItem = ({ item, onUserClick }: { item: NewsItem, onUserClick: (user: any) => void }) => {
  const [liked, setLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(item.comments);
  const [commentInput, setCommentInput] = useState('');
  const inputRef = useRef<InputRef>(null);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleLikeComment = (commentId: number) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  const handleReplyComment = (username: string) => {
    setCommentInput(`@${username} `);
    setTimeout(() => {
      inputRef.current?.focus({
        cursor: 'end',
      });
    }, 0);
  };

  const handleSendComment = () => {
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      user: 'Tôi', // In a real app, this would be the current user's name
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
      content: commentInput,
      timestamp: 'Vừa xong',
      likes: 0,
      isLiked: false
    };

    setComments(prev => [...prev, newComment]);
    setCommentInput('');
  };

  return (
    <div className="bg-white rounded-2xl p-5 mb-4 border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className="relative cursor-pointer group" onClick={() => onUserClick(item.user)}>
            <Avatar src={item.user.avatar} size={48} className="border-2 border-white shadow-sm group-hover:border-blue-200 transition-colors" />
            {item.user.role && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm border border-white">
                {item.user.role}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Text 
                className="text-[15px] font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => onUserClick(item.user)}
              >
                {item.user.name}
              </Text>
              <span className="text-slate-300 text-xs">•</span>
              <Text className="text-slate-400 text-xs font-medium">{item.timestamp}</Text>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
              <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <MapPin size={10} />
              </div>
              {item.location}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {item.status === 'resolved' ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-100">
              <CheckCircle2 size={12} className="text-emerald-500" />
              Đã xử lý
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-100">
              <Clock size={12} className="text-blue-500" />
              Đã duyệt
            </div>
          )}
          <Button type="text" shape="circle" icon={<MoreHorizontal size={18} />} className="text-slate-400 hover:bg-slate-50" />
        </div>
      </div>

      <Paragraph className="mb-4 text-slate-600 text-[15px] leading-relaxed">
        {item.content}
      </Paragraph>

      {item.image && (
        <div className="mb-4 rounded-2xl overflow-hidden shadow-sm group cursor-pointer relative">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
          <Image
            src={item.image}
            alt="Report image"
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            style={{ maxHeight: '320px', width: '100%', objectFit: 'cover' }}
            preview={{ mask: 'Xem ảnh phóng to' }}
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
              liked 
                ? 'bg-red-50 text-red-500' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <Heart size={18} className={liked ? "fill-current" : ""} />
            <span>{likesCount}</span>
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all"
          >
            <MessageCircle size={18} />
            <span>{comments.length}</span>
          </button>
          
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all">
            <Share2 size={18} />
            <span className="hidden sm:inline">Chia sẻ</span>
          </button>
        </div>
      </div>

      {showComments && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-slate-100"
        >
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3 mb-4 last:mb-0 group">
              <Avatar 
                src={comment.avatar} 
                size={32} 
                className="mt-1 cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={() => onUserClick({ name: comment.user, avatar: comment.avatar })}
              />
              <div className="flex-1">
                <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none inline-block max-w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <Text 
                      className="font-bold text-xs text-slate-800 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => onUserClick({ name: comment.user, avatar: comment.avatar })}
                    >
                      {comment.user}
                    </Text>
                    <Text className="text-[10px] text-slate-400">{comment.timestamp}</Text>
                  </div>
                  <Text className="text-sm text-slate-600 block leading-normal">{comment.content}</Text>
                </div>
                <div className="flex gap-3 mt-1 ml-2">
                  <button 
                    className={`text-[11px] font-semibold hover:text-slate-600 transition-colors ${comment.isLiked ? 'text-blue-600' : 'text-slate-400'}`}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    Thích {comment.likes > 0 && `(${comment.likes})`}
                  </button>
                  <button 
                    className="text-[11px] font-semibold text-slate-400 hover:text-slate-600"
                    onClick={() => handleReplyComment(comment.user)}
                  >
                    Phản hồi
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-3 mt-4">
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" size={36} className="shadow-sm" />
            <div className="flex-1 relative group">
              <Input 
                ref={inputRef}
                placeholder="Viết bình luận..." 
                className="rounded-full pl-4 pr-12 py-2 bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 focus:bg-white focus:border-blue-400 transition-all shadow-sm"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onPressEnter={handleSendComment}
              />
              <Button 
                type="text" 
                shape="circle" 
                icon={<Send size={16} />} 
                className="absolute right-1 top-1/2 -translate-y-1/2 text-blue-500 hover:bg-blue-50 z-10"
                onClick={handleSendComment}
                onMouseDown={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const NewsFeed: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <div className="py-4">
      <UserProfileModal 
        user={selectedUser} 
        open={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />

      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-1 h-6 rounded-full"></div>
          <Title level={4} className="!m-0 text-slate-800">Bảng tin phản ánh</Title>
        </div>
        <Button type="link" className="text-blue-600 p-0 font-medium">Xem tất cả</Button>
      </div>

      <div className="space-y-4">
        {mockNews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NewsFeedItem item={item} onUserClick={handleUserClick} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;