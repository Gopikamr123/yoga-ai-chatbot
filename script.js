document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');

    // Focus on input when page loads
    userInput.focus();

    // Event listeners
    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Function to handle user messages
    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input field
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process message and get response (with a slight delay to simulate thinking)
        setTimeout(() => {
            const response = generateResponse(message);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add bot response to chat
            addMessage(response.message, 'bot', response.suggestions);
            
            // Scroll to bottom of chat
            scrollToBottom();
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    // Function to send suggestion chip messages
    window.sendSuggestion = function(suggestion) {
        addMessage(suggestion, 'user');
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process message and get response
        setTimeout(() => {
            const response = generateResponse(suggestion);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add bot response to chat
            addMessage(response.message, 'bot', response.suggestions);
            
            // Scroll to bottom of chat
            scrollToBottom();
        }, 1000 + Math.random() * 1000);
    };

    // Function to add a message to the chat
    function addMessage(message, sender, suggestions = null) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        
        let avatarContent = sender === 'user' ? 
            '<i class="fas fa-user"></i>' : 
            '<img src="https://st3.depositphotos.com/1603730/13076/v/450/depositphotos_130769562-stock-illustration-meditation-icon-human-meditating-in.jpg" alt="Meditation pose silhouette">';
        
        let contentHTML = `<p>${message}</p>`;
        
        // Add suggestions if provided and sender is bot
        if (suggestions && sender === 'bot') {
            contentHTML += `<p class="suggestions">Try asking about:</p>
                           <div class="suggestion-chips">`;
            
            suggestions.forEach(suggestion => {
                contentHTML += `<button class="suggestion-chip" onclick="sendSuggestion('${suggestion}')">${suggestion}</button>`;
            });
            
            contentHTML += `</div>`;
        }
        
        messageElement.innerHTML = `
            <div class="avatar">
                ${avatarContent}
            </div>
            <div class="content">
                ${contentHTML}
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'bot', 'typing-indicator');
        
        typingElement.innerHTML = `
            <div class="avatar">
                <img src="https://st3.depositphotos.com/1603730/13076/v/450/depositphotos_130769562-stock-illustration-meditation-icon-human-meditating-in.jpg" alt="Meditation pose silhouette">
            </div>
            <div class="content">
                <p>Thinking<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>
            </div>
        `;
        
        chatMessages.appendChild(typingElement);
        scrollToBottom();
        
        // Animate the dots
        const dots = typingElement.querySelectorAll('.dot');
        animateDots(dots);
    }

    // Animate typing dots
    function animateDots(dots) {
        let i = 0;
        const interval = setInterval(() => {
            dots.forEach((dot, index) => {
                if (index === i % 3) {
                    dot.style.opacity = '1';
                } else {
                    dot.style.opacity = '0.2';
                }
            });
            i++;
            
            // Check if typing indicator still exists
            if (!document.querySelector('.typing-indicator')) {
                clearInterval(interval);
            }
        }, 300);
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to generate responses based on user input
    function generateResponse(message) {
        message = message.toLowerCase();
        
        // Yoga knowledge base - expanded for comprehensive coverage
        const responses = [
            {
                keywords: ['hello', 'hi', 'hey', 'greetings', 'namaste'],
                response: "Namaste! I'm your AI Yoga Assistant. How can I help you with your yoga practice today? I can provide information on yoga history, various poses, health benefits, different styles, meditation, breathing techniques, and much more.",
                suggestions: ["History of yoga", "Yoga benefits", "Daily practice tips", "Yoga styles"]
            },
            {
                keywords: ['beginner', 'starting', 'new to yoga', 'basic', 'start'],
                response: "For beginners, I recommend starting with these foundational poses: Mountain Pose (Tadasana), Child's Pose (Balasana), Downward-Facing Dog (Adho Mukha Svanasana), and Corpse Pose (Savasana). Begin with 10-15 minutes daily, focusing on your breath and proper alignment rather than flexibility.",
                suggestions: ["How to do Mountain Pose", "Breathing techniques", "Common beginner mistakes", "Yoga equipment"]
            },
            {
                keywords: ['back pain', 'backache', 'spine', 'back problem', 'back issues', 'lower back'],
                response: "Yoga can be excellent for back pain. Try these gentle poses: Cat-Cow stretches, Child's Pose, Sphinx Pose, and Gentle Twists. Remember to move slowly and never push through pain. Hold each pose for 5-10 breaths and practice daily for best results.",
                suggestions: ["Lower back stretches", "Yoga props for back pain", "When to avoid yoga", "Strengthening poses"]
            },
            {
                keywords: ['morning', 'wake up', 'sunrise', 'early', 'energize', 'energy'],
                response: "A morning yoga routine helps energize your day. Try this 10-minute sequence: 1) Start with 5 deep breaths in Easy Pose 2) Cat-Cow stretches (5 rounds) 3) Downward-Facing Dog to Upward-Facing Dog (3 rounds) 4) Standing Forward Fold 5) Mountain Pose with arms raised 6) Sun Salutations (2-3 rounds) 7) End with a brief meditation.",
                suggestions: ["Sun Salutation tutorial", "Energizing breathing", "Morning meditation", "Quick yoga flows"]
            },
            {
                keywords: ['meditation', 'mindfulness', 'focus', 'calm', 'relax', 'peace', 'quiet', 'stillness'],
                response: "Meditation is an essential aspect of yoga. For beginners, try this simple technique: Sit comfortably with your spine straight, close your eyes, and focus on your natural breath. When your mind wanders (which is normal), gently bring attention back to your breath. Start with 5 minutes daily and gradually increase the duration.",
                suggestions: ["Guided meditation", "Breath awareness", "Body scan technique", "Walking meditation"]
            },
            {
                keywords: ['flexibility', 'stiff', 'stretch', 'flexible', 'tight muscles', 'hamstring', 'joints'],
                response: "Improving flexibility takes time and consistency. Focus on these poses: Forward Folds, Butterfly Pose, Lizard Pose, and Reclining Hand-to-Big-Toe Pose. Hold each stretch for 30-60 seconds while breathing deeply. Practice 3-4 times weekly and remember that progress varies for everyone.",
                suggestions: ["Hip opening poses", "Hamstring stretches", "Shoulder flexibility", "Safe stretching tips"]
            },
            {
                keywords: ['strength', 'strong', 'power', 'build muscle', 'core', 'toning', 'stamina'],
                response: "Yoga builds functional strength through holding poses and bodyweight resistance. Try these strengthening poses: Plank, Chair Pose, Warrior II, and Boat Pose. Hold each pose for 5-8 breaths, focusing on proper alignment and core engagement. Add these to your practice 2-3 times per week.",
                suggestions: ["Core strengthening", "Arm balances", "Power yoga", "Yoga for athletes"]
            },
            {
                keywords: ['breathing', 'pranayama', 'breath', 'breathwork', 'breath control', 'inhale', 'exhale'],
                response: "Pranayama (yogic breathing) has numerous benefits. Start with this simple technique called 'Dirga' (Three-Part Breath): 1) Inhale deeply into your belly 2) Continue the inhale into your ribcage 3) Finish by filling your upper chest 4) Exhale slowly in reverse order. Practice for 5 minutes daily in a seated position with a straight spine.",
                suggestions: ["Alternate nostril breathing", "Cooling breath", "Breath of fire", "Ocean breath (Ujjayi)"]
            },
            {
                keywords: ['stress', 'anxiety', 'overwhelm', 'tension', 'worried', 'panic', 'depression', 'mental health'],
                response: "Yoga is excellent for stress relief. Try this calming sequence: 1) Child's Pose (1-2 minutes) 2) Gentle seated forward fold (1 minute) 3) Legs up the wall pose (3-5 minutes) 4) Reclining Bound Angle pose (2 minutes) 5) Corpse pose with deep breathing (5 minutes). Practice in a quiet space before bedtime for best results.",
                suggestions: ["Restorative yoga", "Yoga nidra", "Stress reduction techniques", "Calming breathing exercises"]
            },
            {
                keywords: ['pregnancy', 'pregnant', 'prenatal', 'expecting', 'trimester', 'baby', 'maternity'],
                response: "Prenatal yoga offers many benefits, but always consult your healthcare provider first. Focus on these safe poses: Modified Mountain Pose, Cat-Cow (without the belly drop), Supported Side Angle Pose, and Wide-Knee Child's Pose. Avoid deep twists, inversions, and any pose that puts pressure on your abdomen. Listen to your body and use props liberally.",
                suggestions: ["Pregnancy modifications", "Safe trimester poses", "Pelvic floor exercises", "Yoga for labor prep"]
            },
            {
                keywords: ['sleep', 'insomnia', 'bedtime', 'night', 'rest', 'relaxation', 'before bed'],
                response: "Yoga can significantly improve sleep quality. Try this bedtime sequence: 1) Seated forward fold with a pillow for support (2 minutes) 2) Legs up the wall (3-5 minutes) 3) Supine spinal twist (1 minute each side) 4) Reclined butterfly with pillows under knees (2 minutes) 5) Corpse pose with slow, deep breathing (5+ minutes). Keep the lights dim and avoid screens before practice.",
                suggestions: ["Yoga nidra", "Relaxing bedtime poses", "Breathing for sleep", "Meditation for insomnia"]
            },
            {
                keywords: ['neck', 'shoulder', 'tension', 'upper back', 'headache', 'migraine', 'computer', 'desk'],
                response: "For neck and shoulder tension, try these gentle movements: 1) Neck rolls (5 in each direction) 2) Shoulder rolls (10 in each direction) 3) Eagle arms (hold 30 seconds each side) 4) Cow face arms (hold 30 seconds each side) 5) Seated side bend (hold 30 seconds each side). Focus on relaxing your jaw and keeping your shoulders away from your ears.",
                suggestions: ["Desk yoga", "Posture improvement", "Tech neck remedies", "Stress reduction"]
            },
            {
                keywords: ['kids', 'children', 'child', 'family', 'toddler', 'teen', 'youth'],
                response: "Yoga for kids should be fun and playful! Try these engaging poses: 1) Animal poses like Cat, Cow, Downward Dog, and Cobra 2) Tree pose for balance 3) Partner poses to build cooperation 4) 'Freeze Dance' yoga where kids strike a pose when music stops. Keep sessions under 30 minutes and use storytelling to maintain interest.",
                suggestions: ["Family yoga games", "Mindfulness for kids", "Focus-building poses", "Calming techniques"]
            },
            {
                keywords: ['senior', 'elderly', 'older', 'aging', 'chair yoga', 'gentle', 'limited mobility'],
                response: "Chair yoga is perfect for seniors or those with limited mobility. Try these seated poses: 1) Seated cat-cow for spine flexibility 2) Seated twists for digestion 3) Seated forward fold for hamstrings 4) Ankle and wrist rotations for joint health 5) Seated mountain pose with arm raises for posture. Focus on breath coordination and avoid strain.",
                suggestions: ["Chair yoga sequence", "Balance improvement", "Arthritis relief", "Gentle stretches"]
            },
            {
                keywords: ['weight', 'lose weight', 'fat', 'calorie', 'burn', 'slim', 'fitness', 'cardio'],
                response: "For weight management, try more dynamic yoga styles like Vinyasa, Power Yoga, or Ashtanga. A 60-minute session can burn 300-600 calories. Focus on these elements: 1) Sun Salutations at a moderate pace 2) Standing poses like Warrior sequences 3) Core-strengthening poses like Boat and Plank 4) Consistent practice (3-5 times weekly). Combine with mindful eating for best results.",
                suggestions: ["Power yoga", "Yoga cardio", "Core strengthening", "Yoga for metabolism"]
            },
            {
                keywords: ['equipment', 'props', 'mat', 'block', 'strap', 'bolster', 'blanket', 'wheel'],
                response: "Essential yoga props include: 1) A non-slip mat (4-6mm thickness) 2) Two foam or cork blocks for support 3) A strap to extend reach 4) A bolster for restorative poses 5) 1-2 blankets for padding and warmth. Beginners especially benefit from props as they help maintain proper alignment while building flexibility and strength.",
                suggestions: ["Yoga props guide", "Mat recommendations", "Props for beginners", "DIY yoga props"]
            },
            {
                keywords: ['hot yoga', 'bikram', 'heated', 'sweat', 'temperature'],
                response: "Hot yoga is practiced in a heated room (95-105°F/35-40°C) to warm muscles and increase sweat. Benefits include enhanced flexibility and detoxification through sweating. Important precautions: 1) Stay well-hydrated before, during, and after 2) Start with shorter classes (45-60 min) as you acclimate 3) Take breaks when needed 4) Avoid if pregnant or with certain health conditions (consult your doctor first).",
                suggestions: ["Hot yoga preparation", "Hydration tips", "Post-hot yoga recovery", "Clothing recommendations"]
            },
            {
                keywords: ['style', 'type', 'hatha', 'vinyasa', 'ashtanga', 'kundalini', 'iyengar', 'yin', 'restorative'],
                response: "Yoga comes in many styles, each with unique characteristics and benefits:\n\n1. Vinyasa Yoga: A dynamic style where poses flow smoothly from one to the next, synchronized with breath. It enhances body awareness, reduces stress, and improves focus and concentration. Each class may vary in sequence, keeping practice fresh and engaging.\n\n2. Iyengar Yoga: Focuses on precise alignment and often uses props like blocks, straps, and bolsters. Excellent for developing mindfulness, patience, and enhancing mental clarity. Great for beginners and those with physical limitations.\n\n3. Hatha Yoga: A gentle introduction to basic yoga postures, perfect for beginners. Classes typically involve holding poses for a few breaths with focus on alignment and breathing. Helps promote relaxation and stress relief.\n\n4. Kundalini Yoga: More spiritual in nature, aimed at unlocking energy at the spine's base. Involves chanting, meditation, and specific poses to enhance self-awareness and inner peace. Incorporates kriyas (specific sequences) along with breathing and mantras.\n\n5. Bikram/Hot Yoga: Performed in a heated room (95-105°F) to promote detoxification through sweating. Follows a specific sequence of 26 poses. Builds determination and mental resilience while increasing flexibility.\n\n6. Ashtanga Yoga: A rigorous style following specific sequences of poses in the same order. Six established series of postures increase in difficulty, allowing students to work at their own pace. Improves focus, discipline, and reduces stress.\n\n7. Restorative Yoga: A relaxing style where poses are held for longer periods with prop support. Focuses on complete relaxation and stress reduction. Particularly beneficial for anxiety relief and nervous system regulation.\n\n8. Yin Yoga: Targets deep connective tissues through passive poses held for extended periods (3-5 minutes). Improves flexibility and joint mobility. Cultivates patience and mindfulness while releasing tension.\n\n9. Anusara Yoga: A modern, heart-oriented approach emphasizing alignment principles. Focuses on opening the heart and aligning the body. Can help boost self-esteem and inner positivity.\n\n10. Prenatal Yoga: Specially designed for pregnant women with modifications for safety. Helps prepare the body for childbirth, reduces pregnancy-related stress, and creates community with other expectant mothers.",
                suggestions: ["Which style for beginners", "Comparing yoga styles", "Finding your style", "Style by goal"]
            },
            {
                keywords: ['types of yoga', 'yoga styles', 'calm', 'different styles', 'yoga practices', 'many styles'],
                response: "According to Calm.com, there are numerous yoga styles to explore, each offering unique benefits for mind and body wellness:\n\n1. Vinyasa Yoga: Known for fluid, dynamic movements that flow smoothly from one pose to the next, synchronized with breath. Benefits include enhanced body awareness, stress reduction, and improved focus and concentration. It's like a meditative dance, where finding rhythm in the movements is key.\n\n2. Iyengar Yoga: Distinguished by precise alignment and extensive use of props (blocks, straps, bolsters). This methodical approach develops patience, mindfulness, and mental clarity while making poses accessible to all body types and ability levels. Proper alignment in each pose is emphasized.\n\n3. Hatha Yoga: A gentle form perfect for beginners that combines static poses with breathing. Great for learning the basics of each posture and breath technique while promoting relaxation and stress relief. Today, Hatha typically refers to slower-paced classes focusing on fundamental postures.\n\n4. Kundalini Yoga: A spiritual practice aimed at awakening energy at the spine's base, incorporating chanting, specific breathing techniques, and unique postures. Benefits include enhanced self-awareness and inner peace. Practitioners are encouraged to approach with an open mind and heart.\n\n5. Bikram Yoga: Practiced in a heated room (105°F) with a series of 26 specific poses to promote detoxification. The challenging environment builds determination, mental resilience, and increases flexibility. Proper hydration is essential before, during, and after practice.\n\n6. Ashtanga Yoga: A rigorous, structured style following specific sequences of poses in precise order. Each pose is linked to breath in this physically demanding practice that improves focus, discipline, and reduces stress. Learning the established sequences is foundational.\n\n7. Restorative Yoga: A deeply relaxing practice where poses are held for extended periods with prop support. Particularly beneficial for anxiety reduction and promoting deep relaxation. Props are used to support comfortable holding of poses.\n\n8. Yin Yoga: Targets deep connective tissues by holding passive poses for extended periods (several minutes). Helps improve flexibility, cultivate patience, and enhance joint mobility. Staying in poses for longer periods creates space for mindfulness.\n\n9. Anusara Yoga: A modern, spiritually-oriented system emphasizing alignment and heart-opening. The practice can boost self-esteem and inner positivity through its focus on opening the heart while aligning the body.\n\n10. Prenatal Yoga: Specifically tailored for pregnant women, focusing on safety and preparation for childbirth. Reduces pregnancy-related stress and anxiety while building strength and flexibility appropriate for each stage of pregnancy.\n\nWhen choosing a yoga style, consider your physical condition, personal goals, and what resonates with you spiritually and emotionally. Many practitioners explore different styles before finding their preferred practice, and some combine styles for a balanced approach to yoga.",
                suggestions: ["Vinyasa vs Hatha", "Hot yoga benefits", "Gentle yoga styles", "Best yoga for beginners", "Yoga for flexibility"]
            },
            {
                keywords: ['yoga benefits', 'benefits of yoga', 'yoga advantages', 'why do yoga', 'health benefits'],
                response: "According to Calm.com, yoga offers six key benefits for overall health and wellbeing:\n\n1. Reduced Anxiety and Enhanced Relaxation: Yoga lowers stress hormones like cortisol, creating a calming effect on the nervous system. The combination of movement, breath, and mindfulness helps activate the parasympathetic nervous system, promoting a relaxation response.\n\n2. Improved Emotional Health: Regular practice can help reduce symptoms of depression and anxiety for some practitioners. The mindfulness aspect helps create emotional awareness and regulation, while the community aspect of classes can reduce feelings of isolation.\n\n3. Better Sleep Quality: By relaxing the mind and body, yoga can help improve sleep patterns and address insomnia. Restorative poses and breathing techniques are particularly effective for preparing the body for restful sleep.\n\n4. Enhanced Physical Health and Fitness: Yoga improves flexibility, increases muscle strength, boosts endurance, and enhances respiratory and cardiovascular health. Regular practice can also reduce symptoms of chronic conditions like arthritis, and certain poses can even help with digestion.\n\n5. Lower Blood Pressure and Heart Rate: Studies show yoga can help reduce risk factors for heart diseases, including high blood pressure and stress. The breathing practices in particular can help regulate heart rate and blood pressure responses.\n\n6. Improved Cognitive Functioning: The meditation component of yoga practice has been shown to enhance concentration and memory. The mind-body connection fostered in yoga helps improve neural pathways and overall brain function.\n\nYoga is a holistic practice that combines physical postures, controlled breathing, and meditation to strengthen the body and calm the mind. The word 'yoga' comes from Sanskrit meaning 'to join' or 'to unite,' symbolizing the connection between body and consciousness. Today, yoga is recognized not just as a form of exercise but as a lifestyle that prioritizes balance in all aspects of life.\n\nWhether you're seeking physical improvement, stress management, or spiritual growth, a regular yoga practice can provide comprehensive benefits for your overall wellbeing.",
                suggestions: ["Mental health benefits", "Yoga for stress", "Physical improvements", "Yoga for sleep", "Beginners practice"]
            },
            {
                keywords: ['benefits', 'advantage', 'good', 'health', 'why', 'science', 'research', 'study'],
                response: "Research-backed benefits of yoga include: 1) Reduced stress, anxiety, and depression 2) Improved flexibility, balance, and strength 3) Better sleep quality 4) Reduced inflammation and chronic pain 5) Improved heart health and lower blood pressure 6) Enhanced respiratory function 7) Better body awareness and posture 8) Improved focus and cognitive function. The combination of movement, breath, and mindfulness creates comprehensive physical and mental health benefits.",
                suggestions: ["Mental health benefits", "Physical improvements", "Scientific studies", "Long-term practice"]
            },
            {
                keywords: ['calm benefits', 'six benefits', 'calm.com', 'yoga health advantages'],
                response: "According to Calm.com, yoga offers six key benefits for health and wellbeing:\n\n1. Reduced Anxiety and Enhanced Relaxation: Yoga lowers stress hormones like cortisol, creating a calming effect on the nervous system. The combination of movement, breath, and mindfulness helps activate the parasympathetic nervous system, promoting a relaxation response.\n\n2. Improved Emotional Health: Regular practice can help reduce symptoms of depression and anxiety for some practitioners. The mindfulness aspect helps create emotional awareness and regulation, while the community aspect of classes can reduce feelings of isolation.\n\n3. Better Sleep Quality: By relaxing the mind and body, yoga can help improve sleep patterns and address insomnia. Restorative poses and breathing techniques are particularly effective for preparing the body for restful sleep.\n\n4. Enhanced Physical Health and Fitness: Yoga improves flexibility, increases muscle strength, boosts endurance, and enhances respiratory and cardiovascular health. Regular practice can also reduce symptoms of chronic conditions like arthritis, and certain poses can even help with digestion.\n\n5. Lower Blood Pressure and Heart Rate: Studies show yoga can help reduce risk factors for heart diseases, including high blood pressure and stress. The breathing practices in particular can help regulate heart rate and blood pressure responses.\n\n6. Improved Cognitive Functioning: The meditation component of yoga practice has been shown to enhance concentration and memory. The mind-body connection fostered in yoga helps improve neural pathways and overall brain function.\n\nYoga is a holistic practice that combines physical postures, controlled breathing, and meditation to strengthen the body and calm the mind. The word 'yoga' comes from Sanskrit meaning 'to join' or 'to unite,' symbolizing the connection between body and consciousness. Today, yoga is recognized not just as a form of exercise but as a lifestyle that prioritizes balance in all aspects of life.",
                suggestions: ["Mental health benefits", "Yoga for stress", "Physical improvements", "Yoga for sleep", "Beginners practice"]
            },
            {
                keywords: ['vinyasa', 'flow yoga', 'vinyasa flow', 'flowing yoga'],
                response: "According to Calm.com, Vinyasa yoga is known for its fluid, dynamic movements where each pose flows smoothly into the next, synchronized with breath. The term 'vinyasa' can be translated as 'to place in a special way,' referring to the thoughtful sequencing of poses.\n\nKey characteristics of Vinyasa yoga:\n\n• Flowing movement: Poses transition smoothly from one to the next, creating a dance-like quality\n• Breath synchronization: Each movement is linked to either an inhale or exhale\n• Creative sequencing: Classes often vary, keeping the practice fresh and engaging\n• Moderate intensity: Provides a balance of strength-building and flexibility\n\nBenefits of Vinyasa yoga include:\n\n• Enhanced body awareness as you move mindfully between poses\n• Reduced stress through the meditative quality of synchronized breath and movement\n• Improved focus and concentration from maintaining awareness of breath and alignment\n• Increased strength and flexibility from the varied movements\n\nFor beginners approaching Vinyasa yoga, focus on finding the rhythm in the movements and following your breath. The continuous flow of poses can create a moving meditation effect that many practitioners find deeply centering. Vinyasa is excellent for those who enjoy variety and movement in their yoga practice.",
                suggestions: ["Vinyasa for beginners", "Breath techniques", "Sun salutation flow", "Vinyasa vs Hatha"]
            },
            {
                keywords: ['bikram', 'hot yoga', 'heated yoga', 'hot room', 'sweating'],
                response: "According to Calm.com, Bikram yoga is a specific form of hot yoga performed in a room heated to approximately 105°F (40.6°C) with 40% humidity. Developed by Bikram Choudhury, this practice follows a standardized sequence of 26 poses and two breathing exercises.\n\nKey characteristics of Bikram/Hot yoga:\n\n• Heated environment: The high temperature warms muscles, increases flexibility, promotes detoxification through sweating, and builds mental endurance\n• Structured sequence: Traditional Bikram follows the same 26 poses in the exact same order every class\n• 90-minute format: Classes traditionally last exactly 90 minutes\n• Mirror practice: Studios typically have mirrors to help practitioners check their alignment\n\nBenefits of Bikram/Hot yoga include:\n\n• Increased flexibility as the heat allows muscles to stretch more deeply\n• Improved circulation and cardiovascular conditioning from the heat's effect on heart rate\n• Detoxification through profuse sweating, which helps flush toxins\n• Enhanced mental determination and resilience from practicing in challenging conditions\n• Stress reduction through intense focus required in the heated environment\n\nImportant safety considerations:\n\n• Hydrate thoroughly before, during, and after practice\n• Begin with shorter classes (45-60 minutes) as you acclimate to the heat\n• Take breaks and rest in child's pose whenever needed\n• Consult your doctor before trying hot yoga if you're pregnant or have certain health conditions\n• Exit the room if you feel dizzy, nauseous, or excessively uncomfortable\n\nMany studios now offer variations of hot yoga that may follow different sequences or use lower temperatures while maintaining the benefits of heated practice.",
                suggestions: ["Hot yoga preparation", "Hydration tips", "Benefits of heat", "Hot yoga safety", "Modifications"]
            },
            {
                keywords: ['four paths', 'karma yoga', 'bhakti yoga', 'jnana yoga', 'raja yoga', 'kriya yoga'],
                response: "Yoga works on four fundamental levels of existence, giving rise to four broad classifications:\n\n1. Karma Yoga: The path of action or selfless service\n- Utilizes the body through selfless action\n- Purifies the heart by acting without attachment to results\n- Helps overcome ego through service to others\n- Exemplified in the Bhagavad Gita's teachings to Arjuna\n\n2. Bhakti Yoga: The path of devotion\n- Utilizes emotions and transforms them into unconditional love\n- Involves practices like prayer, worship, and ritual\n- Cultivates surrender and dedication to the divine\n- Suitable for people with emotional temperament\n\n3. Jnana Yoga: The path of knowledge and wisdom\n- Utilizes the intellect and mind\n- Involves study of scriptures, self-inquiry, and discrimination\n- Seeks to discern the real from the unreal\n- Requires sharp intellect and strong willpower\n\n4. Kriya/Raja Yoga: The path of energy control and meditation\n- Utilizes the energy of the body and mind\n- Encompasses Patanjali's eight limbs of yoga\n- Includes practices like asana, pranayama, and meditation\n- Provides systematic approach to self-realization\n\nEach individual is a unique combination of these four aspects. According to tradition, a Guru (teacher) is essential because only a Guru can determine the appropriate combination of these paths for each seeker based on their temperament and needs.",
                suggestions: ["Karma yoga practice", "Bhakti yoga devotion", "Jnana yoga wisdom", "Raja yoga system"]
            },
            {
                keywords: ['misconceptions', 'yoga myths', 'yoga clarification', 'yoga not religion'],
                response: "There are several common misconceptions about yoga that deserve clarification:\n\n1. Yoga is not merely physical exercise: While physical and mental health are natural consequences of yoga, the practice aims at harmonizing oneself with the universe. Among Patanjali's Yoga Sutras, only three sutras are dedicated to asanas (postures).\n\n2. Yoga is not tied to any religion: Yoga does not adhere to any particular religion, belief system, or community. It has always been approached as a technology for inner wellbeing. Anyone who practices yoga with involvement can benefit, regardless of faith, ethnicity, or culture.\n\n3. Hatha Yoga is preparatory: Fundamentally, Hatha Yoga is a preparatory process so that the body can sustain higher levels of energy. The process begins with the body, then the breath, the mind, and the inner self.\n\n4. All aspects of yoga are important: Many practitioners focus only on asanas, but traditional yoga encompasses ethical practices (yama and niyama), breath control (pranayama), concentration (dharana), meditation (dhyana), and more.\n\n5. Yoga is for everyone: Regardless of age, health condition, or physical abilities, yoga can be adapted to benefit anyone. The practices can be modified to meet individual needs and limitations.\n\n6. Guru guidance is valuable: Traditional texts emphasize the importance of practicing under the guidance of a knowledgeable teacher to ensure proper technique and appropriate practices for one's individual constitution.",
                suggestions: ["Yoga vs exercise", "Spiritual aspects", "Adapting yoga practice", "Modern yoga approaches"]
            },
            {
                keywords: ['ancient texts', 'yoga sutras', 'scripture', 'sacred texts', 'yoga books', 'patanjali'],
                response: "Yoga's rich philosophical tradition is preserved in numerous ancient texts. The most significant ones include:\n\n1. Yoga Sutras of Patanjali (circa 200 BCE)\n- The foundational text of classical yoga\n- Contains 196 sutras (aphorisms) organized in four chapters\n- Outlines the eight limbs (Ashtanga) of yoga\n- Provides a systematic approach to stilling the mind\n- Vyasa's commentary on this text is considered authoritative\n\n2. Hatha Yoga Pradipika (14th-15th century CE)\n- Written by Svatmarama, a key text on Hatha Yoga\n- Details asanas, pranayama, mudras, bandhas, and shatkarmas\n- Focuses on purification of the body as preparation for higher practices\n- Describes Kundalini awakening and subtle body system\n\n3. Bhagavad Gita (part of the Mahabharata, circa 200 BCE)\n- Lord Krishna's discourse to Arjuna on the battlefield\n- Elaborates on Karma Yoga, Bhakti Yoga, and Jnana Yoga\n- Discusses duty, devotion, and self-knowledge\n- One of the most influential texts in Indian philosophy\n\n4. Upanishads (circa 800-200 BCE)\n- Particularly the Yoga Upanishads detail yogic practices\n- Explore concepts of Brahman, Atman, and their unity\n- Present philosophical foundations of yoga\n\n5. Gheranda Samhita (17th century CE)\n- A classic text on Hatha Yoga by sage Gheranda\n- Describes seven limbs (Saptanga) of yoga\n- Details 32 asanas, 25 mudras, and various purification techniques\n\n6. Shiva Samhita (17th-18th century CE)\n- Attributes teachings to Lord Shiva\n- Discusses yogic anatomy, chakras, and energy channels\n- Presents philosophical concepts and practical techniques\n\nThese texts collectively form the literary foundation of yoga, providing both theoretical framework and practical guidance for practitioners.",
                suggestions: ["Patanjali's philosophy", "Hatha yoga texts", "Yoga Upanishads", "Modern yoga literature"]
            },
            {
                keywords: ['yoga terminology', 'sanskrit terms', 'yoga vocabulary', 'yoga words', 'yoga glossary'],
                response: "Understanding key yoga terminology enhances practice and study. Here are essential Sanskrit terms in yoga:\n\n1. Basic Concepts:\n- Yoga: Union or to yoke; the practice of uniting individual consciousness with universal consciousness\n- Asana: Physical posture; originally meant a stable, comfortable seat for meditation\n- Pranayama: Breath control and expansion of life force (prana)\n- Dhyana: Meditation or contemplation\n- Samadhi: Complete absorption or enlightenment\n\n2. Eight Limbs of Yoga (Ashtanga):\n- Yama: Ethical restraints (ahimsa/non-violence, satya/truthfulness, asteya/non-stealing, brahmacharya/moderation, aparigraha/non-possessiveness)\n- Niyama: Observances (saucha/purity, santosha/contentment, tapas/discipline, svadhyaya/self-study, ishvara pranidhana/surrender to the divine)\n- Asana: Physical postures\n- Pranayama: Breath control\n- Pratyahara: Withdrawal of senses\n- Dharana: Concentration\n- Dhyana: Meditation\n- Samadhi: Absorption or enlightenment\n\n3. Energy System:\n- Prana: Life force or vital energy\n- Nadis: Energy channels in the subtle body (72,000 in number)\n- Chakras: Energy centers along the spine (muladhara/root, svadhisthana/sacral, manipura/solar plexus, anahata/heart, vishuddha/throat, ajna/third eye, sahasrara/crown)\n- Kundalini: Dormant spiritual energy at the base of the spine\n\n4. Practices:\n- Mudra: Symbolic hand gestures that direct energy\n- Bandha: Energy locks in the body\n- Mantra: Sacred sound, word or phrase repeated during meditation\n- Shatkarma: Six cleansing techniques of Hatha Yoga\n\n5. States of Consciousness:\n- Chitta: Mind or consciousness\n- Vritti: Mental fluctuation or thought wave\n- Nirodha: Cessation or restriction (of thought waves)\n- Samskara: Mental impression or psychological imprint\n\nThese terms form the vocabulary of traditional yoga and help practitioners understand the depth and richness of the tradition.",
                suggestions: ["Eight limbs explained", "Chakra system", "Yoga breathing terms", "Sanskrit pronunciation"]
            },
            {
                keywords: ['common poses', 'basic poses', 'popular asanas', 'fundamental poses', 'yoga poses'],
                response: "Here are 10 fundamental yoga poses (asanas) every practitioner should know:\n\n1. Mountain Pose (Tadasana): The foundation of all standing poses. Stand with feet together, weight evenly distributed, arms at sides, and spine tall. Builds posture awareness and balance.\n\n2. Downward-Facing Dog (Adho Mukha Svanasana): Form an inverted V-shape with hands and feet on the mat, hips high. Stretches hamstrings, shoulders, and calves while strengthening arms and legs.\n\n3. Warrior I (Virabhadrasana I): A powerful lunging pose with arms extended overhead. Builds strength in legs, opens chest and shoulders, and improves focus.\n\n4. Warrior II (Virabhadrasana II): From a wide stance, extend arms parallel to the floor with front knee bent. Strengthens legs and core while opening hips.\n\n5. Tree Pose (Vrksasana): Balance on one leg with the other foot placed against the inner thigh. Improves balance, focus, and ankle stability.\n\n6. Triangle Pose (Trikonasana): From a wide stance, reach down to touch the floor while extending the other arm up. Creates length in the spine and stretches hamstrings.\n\n7. Child's Pose (Balasana): A restful position with knees wide, big toes touching, and arms extended forward. Excellent for resting between challenging poses.\n\n8. Cobra Pose (Bhujangasana): Lying on stomach, lift chest while keeping hands under shoulders. Strengthens spine and opens chest.\n\n9. Seated Forward Fold (Paschimottanasana): Sitting with legs extended, hinge at hips to fold forward. Deeply stretches hamstrings and lower back.\n\n10. Corpse Pose (Savasana): Lie flat on back with arms at sides and eyes closed. The essential relaxation pose that allows the body to integrate benefits of practice.\n\nFor each pose, focus on proper alignment, comfortable breathing, and finding your appropriate edge between effort and ease.",
                suggestions: ["Standing poses", "Balance poses", "Forward folds", "Backbends", "Modifications"]
            },
            {
                keywords: ['office', 'desk', 'workplace', 'work', 'sitting', 'corporate', 'computer'],
                response: "Yoga can counteract the negative effects of office work and prolonged sitting. Try incorporating these practices into your workday:\n\n1. Chair Yoga Mini-Breaks (3-5 minutes, every hour):\n• Seated Spinal Twist: Sit tall, place right hand on left knee, left hand behind you, and gently twist. Hold for 5 breaths each side.\n• Seated Cat-Cow: Place hands on knees, arch spine forward on inhale, round spine on exhale.\n• Seated Eagle Arms: Cross right arm over left, bend elbows, and press palms together. Hold 30 seconds, switch sides.\n• Wrist and Finger Stretches: Extend arms, gently pull fingers back, then forward.\n\n2. Standing Desk Yoga (2 minutes, whenever possible):\n• Mountain Pose: Stand tall with feet hip-width apart, roll shoulders back, and take 5 deep breaths.\n• Desk Downward Dog: Place hands on desk edge, step back, and form an inverted L-shape.\n• Standing Side Bend: Extend arms overhead, interlace fingers, and lean to each side.\n\n3. Eye Strain Relief (30 seconds, every 20 minutes):\n• 20-20-20 Rule: Look at something 20 feet away for 20 seconds every 20 minutes.\n• Palm Eyes: Rub palms together to create heat, then gently cup over closed eyes.\n\n4. Tension Release (2 minutes, whenever needed):\n• Neck Rolls: Slowly circle head in both directions.\n• Shoulder Shrugs: Lift shoulders to ears on inhale, drop completely on exhale.\n\n5. Post-Work Recovery (10 minutes):\n• Low Lunge: Opens hip flexors tightened from sitting.\n• Chest Expansion: Interlace hands behind back and gently lift arms.\n• Forward Fold: Releases lower back tension from sitting.\n\nConsistency is key. Set reminders to practice these mini-sessions throughout your workday for maximum benefit.",
                suggestions: ["Desk stretches", "Computer eye strain", "Wrist health", "Posture improvement", "Office relaxation"]
            },
            {
                keywords: ['runners', 'running', 'joggers', 'jogging', 'marathon', 'sprinter', 'athlete'],
                response: "Yoga complements running by improving flexibility, preventing injuries, and enhancing recovery. Here's a yoga practice specifically designed for runners:\n\n1. Pre-Run Yoga (5-10 minutes):\n• Dynamic Sun Salutations: 3-5 rounds to warm up muscles and joints\n• Leg Swings: Hold onto a wall for balance and swing each leg forward/back and side to side\n• Ankle Rotations: Circle each ankle 10 times in each direction\n• Runner's Lunge with Gentle Twist: Opens hip flexors and activates core rotation\n\n2. Post-Run Recovery Yoga (15-20 minutes):\n• Low Lunge (Anjaneyasana): Hold 1-2 minutes per side to deeply release hip flexors\n• Lizard Pose: Targets outer hips often neglected in running's forward motion\n• Reclining Pigeon: Relieves tight glutes and piriformis\n• Legs Up the Wall: 3-5 minutes to reduce swelling and promote circulation\n• Supine Hamstring Stretch: Using a strap to gently extend and release hamstrings\n\n3. Focus Areas for Runners:\n• Hamstrings: Forward Folds, Downward Dog, Half Splits\n• IT Bands: Reclined Figure 4, Triangle Pose, Extended Side Angle\n• Calves: Downward Dog pedaling feet, Low Lunge with heel down\n• Quads: Dancer's Pose, Reclining Hero Pose, Supported Bridge\n• Feet: Toe Spreading, Foot Massage with tennis ball\n\n4. Yoga for Mental Training:\n• Breath awareness during challenging poses builds mental endurance for long runs\n• Balance poses like Tree and Eagle improve focus and ankle stability\n• Meditation reduces pre-race anxiety and improves running economy\n\nPractice yoga 2-3 times weekly, with shorter sessions on running days and longer sessions on rest days. Always listen to your body and modify poses as needed, especially after intense training.",
                suggestions: ["IT band stretches", "Hamstring recovery", "Runner's meditation", "Pre-race yoga", "Injury prevention"]
            },
            {
                keywords: ['posture', 'alignment', 'slouching', 'rounded shoulders', 'hunched', 'spine', 'straighten'],
                response: "Yoga can dramatically improve your posture by strengthening key muscles, increasing body awareness, and releasing tension. Practice these poses regularly for better alignment:\n\n1. Foundation Poses for Awareness:\n• Mountain Pose (Tadasana): The blueprint for good posture. Practice against a wall to feel proper alignment of ears, shoulders, hips, and ankles in one vertical line.\n• Cat-Cow Flow: Helps identify neutral spine position and increases spinal mobility.\n• Child's Pose to Upward Dog Flow: Teaches spinal articulation and strengthens back muscles.\n\n2. Upper Body Posture Correctors:\n• Cobra Pose: Strengthens upper and mid-back muscles that support upright posture.\n• Locust Pose: Targets posterior chain and counteracts forward head position.\n• Reverse Prayer Hands: Opens chest and brings awareness to rounded shoulders.\n• Eagle Arms: Releases tension between shoulder blades and improves shoulder mobility.\n\n3. Core Strengtheners for Postural Support:\n• Plank Pose: Builds essential core stability that supports proper spine alignment.\n• Boat Pose: Strengthens deep abdominal muscles needed for upright posture.\n• Bird-Dog: Develops core stability while on hands and knees.\n\n4. Chest and Shoulder Openers:\n• Bridge Pose: Counteracts slouching by opening chest and strengthening back.\n• Supported Fish Pose: Use a bolster or rolled towel along spine to open chest.\n• Doorway Stretch: While not a traditional yoga pose, this helps open chronically tight chest muscles.\n\n5. Daily Posture Routine (5-10 minutes):\n• Mountain Pose: 5 deep breaths\n• Gentle Backbend: 5 breaths\n• Shoulder Rolls: 10 in each direction\n• Eagle Arms: Hold 30 seconds each side\n• Seated Spinal Twist: 5 breaths each side\n\nConsistency is more important than duration. Practice good posture awareness throughout the day, imagining a string pulling the crown of your head toward the ceiling while keeping shoulders relaxed.",
                suggestions: ["Desk posture", "Core for alignment", "Shoulder openers", "Text neck remedies", "Daily alignment practice"]
            },
            {
                keywords: ['sleep better', 'insomnia', 'bedtime yoga', 'night', 'falling asleep', 'sleep quality'],
                response: "Yoga can significantly improve sleep quality by calming the nervous system and releasing physical tension. Try this 15-minute bedtime sequence:\n\n1. Calming Breath Practice (2-3 minutes):\n• Extended Exhale Breathing: Inhale for count of 4, exhale for count of 6-8\n• Practice in a seated position or lying down\n• Place one hand on belly to feel the breath moving\n\n2. Gentle Movement (5 minutes):\n• Supine Spinal Twist: Lying on back, hug knees to chest then let them fall to each side\n• Happy Baby Pose: Lie on back, hold outside edges of feet with knees bent toward armpits\n• Seated Forward Fold: Sit with legs extended, fold forward with rounded spine\n• Butterfly Pose: Sitting with soles of feet together, allow knees to open wide\n\n3. Restorative Poses (8-10 minutes):\n• Legs Up the Wall: Position hips near wall with legs extended up wall (3-5 minutes)\n• Reclined Bound Angle: Lie on back with soles of feet together, knees open wide, arms at sides (2-3 minutes)\n• Supported Child's Pose: Use pillows under torso for comfort (if preferred)\n\n4. Final Relaxation:\n• Corpse Pose: Lie flat with arms slightly away from body, palms up\n• Body Scan: Mentally release tension from toes to head\n• Continue slow, deep breathing as you drift toward sleep\n\nSleep-Enhancing Tips:\n• Practice in dim lighting or candlelight\n• Keep room cool and well-ventilated\n• Use comfortable, non-restrictive clothing\n• Try adding 2-3 drops of lavender essential oil on your pillow\n• Avoid screens at least 30 minutes before this practice\n\nConsistency greatly enhances effectiveness. If you wake during the night, the extended exhale breathing can help you return to sleep.",
                suggestions: ["Bedtime routine", "Calming breath", "Restorative poses", "Yoga nidra", "Sleep meditation"]
            },
            {
                keywords: ['digestion', 'stomach', 'bloating', 'gut health', 'digestive', 'constipation', 'gas'],
                response: "Yoga can significantly improve digestive health through specific poses that massage internal organs, reduce stress, and improve circulation to the digestive tract. Try this sequence for better digestion:\n\n1. Warmup with Breath (2-3 minutes):\n• Seated deep breathing with hands on belly\n• Diaphragmatic breathing: Feel belly expand on inhale, contract on exhale\n\n2. Digestive Sequence (practice gently, 10-15 minutes total):\n• Wind-Relieving Pose: Lying on back, hug one knee then both knees to chest\n• Supine Spinal Twist: Excellent for massaging abdominal organs and relieving gas\n• Cat-Cow: Promotes peristalsis (wave-like muscle contractions that move food through digestive tract)\n• Seated Spinal Twist: Compresses digestive organs on one side while stretching the other\n• Child's Pose: Provides gentle pressure on abdomen while calming nervous system\n• Knees-to-Chest with Gentle Rocking: Massages lower back and abdominal region\n\n3. Specific Poses for Common Issues:\n• For Bloating: Apanasana (knees-to-chest) and Pawanmuktasana (wind-relieving pose)\n• For Constipation: Malasana (squat pose) and forward folds\n• For Acid Reflux: Supported bridge pose and left-side lying position\n• For Sluggish Digestion: Dynamic Sun Salutations to stimulate digestive fire\n\n4. Abdominal Self-Massage:\n• Lie on back with knees bent\n• Place hands on lower belly\n• Massage in clockwise circles (follows the direction of the colon)\n\nTiming Tips:\n• For daily digestive maintenance: Practice in the morning before breakfast\n• For occasional digestive discomfort: Practice 2-3 hours after eating\n• For constipation: Morning practice is most effective\n• For bloating: Evening practice can reduce overnight discomfort\n\nYoga works best for digestion when combined with mindful eating, adequate hydration, and stress management techniques.",
                suggestions: ["Bloating relief", "Constipation poses", "Abdominal massage", "Digestive breathing", "Ayurvedic tips"]
            },
            {
                keywords: ['seasonal', 'weather', 'summer', 'winter', 'spring', 'fall', 'autumn', 'seasonal yoga'],
                response: "Yoga can help you stay balanced through seasonal changes by adapting practices to counterbalance each season's effects on body and mind:\n\n1. Spring Yoga (Energizing & Detoxifying):\n• Focus: Gentle detoxification, opening the chest, stimulating circulation\n• Recommended Poses: Twists, gentle backbends, standing poses\n• Breath Practice: Kapalabhati (skull-shining breath) for 1-2 minutes\n• Ideal Time: Morning practice to align with spring's rising energy\n• Sequence: Sun Salutations, Twisting Triangle, Bridge Pose, seated twists\n• Balance Allergy Symptoms: Supported Fish Pose to open chest, Alternate Nostril Breathing\n\n2. Summer Yoga (Cooling & Calming):\n• Focus: Cooling the body, calming the mind, moderate exertion\n• Recommended Poses: Forward folds, gentle practice, moon salutations\n• Breath Practice: Sitali/Sitkari (cooling breath through curled tongue or teeth)\n• Ideal Time: Early morning or evening when temperatures are lower\n• Sequence: Moon Salutations, Standing Forward Fold, Butterfly Pose, Legs-up-the-Wall\n• Pitta-Pacifying: Focus on surrendering rather than striving in poses\n\n3. Autumn Yoga (Grounding & Immune-Boosting):\n• Focus: Grounding poses, lung expansion, immune support\n• Recommended Poses: Standing poses, mild inversions, gentle backbends\n• Breath Practice: Three-part breath with focus on expanding lungs fully\n• Ideal Time: Midday practice to counteract decreasing daylight\n• Sequence: Standing poses like Warrior series, Bridge Pose, seated meditation\n• Vata-Balancing: Establish routine and focus on stability in practice\n\n4. Winter Yoga (Warming & Invigorating):\n• Focus: Building internal heat, boosting mood, opening chest and hips\n• Recommended Poses: Sun Salutations, backbends, hip openers, longer holds\n• Breath Practice: Ujjayi (victorious breath) to build internal warmth\n• Ideal Time: Midday when natural light is strongest\n• Sequence: Vigorous Sun Salutations, Warrior poses, Camel Pose, Hip openers\n• Kapha-Reducing: Create warmth and movement to counteract winter stagnation\n\nFor any season, adapt your practice to honor both the external environment and your internal state. Seasonal transitions are ideal times to reassess and adjust your yoga routine.",
                suggestions: ["Winter warming yoga", "Summer cooling poses", "Spring detox", "Fall grounding", "Seasonal meditation"]
            },
            {
                keywords: ['bone health', 'osteoporosis', 'osteopenia', 'bone density', 'brittle bones', 'skeletal'],
                response: "Yoga can be highly beneficial for bone health when practiced safely and appropriately. Here's a bone-strengthening approach to yoga:\n\n1. Key Benefits for Bone Health:\n• Weight-bearing poses stimulate bone remodeling and density\n• Balance practice reduces fall risk (a major concern with osteoporosis)\n• Improved posture reduces fracture risk by distributing forces properly\n• Gentle movement maintains joint mobility without excessive stress\n\n2. Safe Practice Guidelines:\n• Avoid extreme forward folds (especially with spinal osteoporosis)\n• Modify twists to be gentle and open (no forced or closed twists)\n• Avoid extreme backbends which can compress vertebrae\n• Focus on proper alignment to distribute weight safely\n\n3. Bone-Building Yoga Sequence (hold each pose 20-30 seconds, repeat 2-3 times):\n• Mountain Pose: The foundation for good alignment and posture\n• Tree Pose: Weight-bearing on one leg (use wall support if needed)\n• Modified Warrior II: Strengthens legs, hips, and upper body\n• Chair Pose: Builds leg and hip strength (keep back straight)\n• Modified Triangle: With hand on shin or block (not floor)\n• Bridge Pose: Strengthens spine and hips (avoid if severe spinal osteoporosis)\n• Wall Plank: Builds upper body and core strength safely\n\n4. Important Modifications:\n• Use a chair for balance in standing poses when needed\n• Keep spine in neutral alignment during forward bends\n• Use props (blocks, straps, blankets) for support\n• Focus on gentle engagement rather than deep stretching\n\n5. Additional Considerations:\n• Combine yoga with other bone-healthy activities (walking, resistance training)\n• Practice consistently (2-3 times weekly) for best results\n• Work with a yoga teacher experienced in osteoporosis if possible\n• Always consult your healthcare provider before beginning practice\n\nYoga for bone health emphasizes control, stability, and alignment rather than flexibility or achieving complicated poses.",
                suggestions: ["Safe modifications", "Balance practice", "Yoga & calcium", "Posture improvement", "Fall prevention"]
            },
            {
                keywords: ['emotions', 'emotional health', 'mood', 'feelings', 'emotional balance', 'emotional wellbeing'],
                response: "Yoga offers powerful tools for emotional balance by connecting body, breath, and mind. Here's how to use yoga for emotional wellbeing:\n\n1. Understanding the Body-Emotion Connection:\n• Physical tension often reflects emotional states (e.g., tight shoulders with anxiety)\n• Breath patterns are directly linked to emotional responses\n• Certain poses can release emotional energy stored in the body\n• Regular practice creates space between stimulus and response\n\n2. Grounding Practices for Anxiety or Overwhelm:\n• Standing poses like Mountain, Warrior II, and Triangle\n• Focus on the sensation of feet connecting to earth\n• Slow, deep breathing with extended exhales (4-count in, 6-count out)\n• Gentle forward folds with support (allows nervous system to settle)\n\n3. Energizing Practices for Depression or Lethargy:\n• Gentle backbends like Cobra, Bridge, and Camel\n• Sun Salutations at a moderate pace\n• Kapalabhati breath (rapid, rhythmic exhalations)\n• Heart-opening poses like Supported Fish\n\n4. Balancing Practices for Mood Swings:\n• Alternate nostril breathing (Nadi Shodhana)\n• Balancing poses like Tree, Eagle, and Half Moon\n• Flowing sequences that synchronize breath with movement\n• Seated meditation with awareness of emotional states\n\n5. Emotional Release Techniques:\n• Hip openers like Pigeon Pose (hips often store emotional tension)\n• Supported Child's Pose with focus on surrendering\n• Lion's Breath with sound (exhale with open mouth and tongue out)\n• Gentle, supported inversions like Legs Up the Wall\n\n6. Daily 10-Minute Emotional Balance Practice:\n• 2 minutes: Seated breath awareness\n• 3 minutes: Gentle movement targeting areas of tension\n• 3 minutes: One pose that addresses current emotional need\n• 2 minutes: Relaxation with body scan\n\nRemember that emotional release through yoga can sometimes bring unexpected feelings to the surface. Create a safe, private space for practice and be gentle with yourself in the process.",
                suggestions: ["Anxiety relief", "Mood-lifting poses", "Yoga for grief", "Emotional release", "Breath & emotions"]
            },
            {
                keywords: ['breath techniques', 'pranayama', 'breathing exercises', 'breath control', 'yogic breathing'],
                response: "Pranayama (yogic breathing techniques) offers profound benefits for physical and mental wellbeing. Here are essential breath practices to incorporate into your yoga routine:\n\n1. Foundational Breath Awareness (Svadyaya):\n• Sit comfortably with a tall spine\n• Observe natural breath without changing it\n• Notice length, depth, and quality of breath\n• Observe any areas of restriction or ease\n• Practice for 2-5 minutes daily to establish breath awareness\n\n2. Complete Yogic Breath (Dirga Pranayama):\n• Inhale sequentially into belly, ribcage, and upper chest\n• Exhale in reverse order: upper chest, ribcage, belly\n• Benefits: Increases oxygen intake, releases tension, improves lung capacity\n• Practice: 5-10 rounds, anytime, especially before meditation\n\n3. Ocean Breath (Ujjayi Pranayama):\n• Breathe through nose with slight constriction at back of throat\n• Creates audible sound like ocean waves\n• Benefits: Builds internal heat, focuses mind, coordinates with asana practice\n• Practice: During yoga poses or for 3-5 minutes seated\n\n4. Alternate Nostril Breathing (Nadi Shodhana):\n• Use right thumb to close right nostril, inhale through left\n• Use right ring finger to close left nostril, exhale through right\n• Inhale right, exhale left, continuing the pattern\n• Benefits: Balances nervous system, improves focus, calms mind\n• Practice: 5-10 rounds (one round = in and out both nostrils) when stressed or needing balance\n\n5. Cooling Breath (Sitali or Sitkari):\n• Sitali: Curl tongue into tube, inhale through tube, exhale through nose\n• Sitkari: Inhale through teeth with lips parted, exhale through nose\n• Benefits: Reduces body temperature, calms anger, reduces thirst\n• Practice: 5-10 rounds during hot weather or when feeling overheated\n\n6. Energizing Breath (Kapalabhati):\n• Quick, forceful exhalations with passive inhalations\n• Rapid pumping of lower abdomen\n• Benefits: Clears mind, energizes body, strengthens abdominal muscles\n• Practice: 3 rounds of 20-30 breaths, with breaks between rounds\n• Caution: Avoid if pregnant, with high blood pressure, or heart conditions\n\nGeneral Pranayama Guidelines:\n• Practice on empty stomach (2-3 hours after eating)\n• Start with lower counts and fewer rounds, gradually increasing\n• If dizziness occurs, return to normal breathing\n• Always end with normal breath observation\n• For best results, practice at same time daily",
                suggestions: ["Morning pranayama", "Calming breaths", "Energizing techniques", "Breath for focus", "Advanced practices"]
            }
        ];

        // Default response if no match is found
        let bestResponse = {
            message: "I'm still learning about yoga. Could you rephrase your question or ask about beginner poses, specific asanas, breathing techniques, or meditation?",
            suggestions: ["Beginner yoga poses", "Breathing techniques", "Meditation basics", "Yoga benefits"]
        };

        // Find the best matching response based on keywords
        let highestMatchCount = 0;
        
        responses.forEach(item => {
            const matchCount = item.keywords.filter(keyword => message.includes(keyword)).length;
            if (matchCount > highestMatchCount) {
                highestMatchCount = matchCount;
                bestResponse = {
                    message: item.response,
                    suggestions: item.suggestions
                };
            }
        });

        return bestResponse;
    }
});

// Add some CSS for the typing indicator animation
const style = document.createElement('style');
style.textContent = `
    .typing-indicator .dot {
        opacity: 0.2;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style); 