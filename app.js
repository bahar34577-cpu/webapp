// WA Bot Panel - Main Application dengan Integrasi API Pakasir
document.addEventListener('DOMContentLoaded', function() {
    console.log('WA Bot Panel dengan API Pakasir loaded');
    
    // Initialize the application
    initApp();
    
    // Hide skeleton loader after 1.5 seconds
    setTimeout(() => {
        document.getElementById('skeleton-loader').classList.add('hidden');
    }, 1500);
});

// Global variables
let currentUser = null;
let isLoggedIn = false;
let currentProduct = null;
let depositAmount = 0;
let depositTimer = null;
let depositExpiry = null;
let otpTimer = null;
let swipeStartX = 0;
let swipeCurrentX = 0;
let isSwiping = false;
let products = [];
let services = [];
let banners = [];

// Konfigurasi API Pakasir
const PAKASIR_CONFIG = {
    API_KEY: 'ES4mWVwOTQC5zp1TYheedHcJlgt4bq7o', // API Key yang Anda berikan
    PROJECT_SLUG: 'YOUR_PROJECT_SLUG_HERE', // Ganti dengan project slug Anda
    API_BASE_URL: 'https://app.pakasir.com/api',
    CREATE_QRIS_ENDPOINT: '/transactioncreate/qris',
    CHECK_STATUS_ENDPOINT: '/transactiondetail'
};

// Initialize the application
function initApp() {
    // Initialize data
    initData();
    
    // Check if user is already logged in
    checkLoginStatus();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup routing
    setupRouting();
    
    // Setup modals
    setupModals();
    
    // Initialize UI components
    initUIComponents();
}

// Initialize dummy data
function initData() {
    // Products data
    products = [
        {
            id: 1,
            name: "Panel Bot WhatsApp — 1GB",
            category: "Panel Bot",
            price: 25000,
            description: "Panel bot WhatsApp dengan kapasitas 1GB untuk kebutuhan kecil Anda.",
            features: [
                "Kapasitas 1GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian"
            ],
            isFeatured: false
        },
        {
            id: 2,
            name: "Panel Bot WhatsApp — 2GB",
            category: "Panel Bot",
            price: 45000,
            description: "Panel bot WhatsApp dengan kapasitas 2GB untuk kebutuhan menengah.",
            features: [
                "Kapasitas 2GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun"
            ],
            isFeatured: true
        },
        {
            id: 3,
            name: "Panel Bot WhatsApp — 3GB",
            category: "Panel Bot",
            price: 65000,
            description: "Panel bot WhatsApp dengan kapasitas 3GB untuk kebutuhan bisnis kecil.",
            features: [
                "Kapasitas 3GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access"
            ],
            isFeatured: false
        },
        {
            id: 4,
            name: "Panel Bot WhatsApp — 4GB",
            category: "Panel Bot",
            price: 85000,
            description: "Panel bot WhatsApp dengan kapasitas 4GB untuk kebutuhan bisnis menengah.",
            features: [
                "Kapasitas 4GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access",
                "Custom Command"
            ],
            isFeatured: false
        },
        {
            id: 5,
            name: "Panel Bot WhatsApp — 5GB",
            category: "Panel Bot",
            price: 105000,
            description: "Panel bot WhatsApp dengan kapasitas 5GB untuk kebutuhan bisnis besar.",
            features: [
                "Kapasitas 5GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access",
                "Custom Command",
                "Priority Support"
            ],
            isFeatured: false
        },
        {
            id: 6,
            name: "Panel Bot WhatsApp — 6GB",
            category: "Panel Bot",
            price: 125000,
            description: "Panel bot WhatsApp dengan kapasitas 6GB untuk kebutuhan enterprise.",
            features: [
                "Kapasitas 6GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access",
                "Custom Command",
                "Priority Support",
                "Dedicated Server"
            ],
            isFeatured: false
        },
        {
            id: 7,
            name: "Panel Bot WhatsApp — 7GB",
            category: "Panel Bot",
            price: 145000,
            description: "Panel bot WhatsApp dengan kapasitas 7GB untuk kebutuhan enterprise plus.",
            features: [
                "Kapasitas 7GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access",
                "Custom Command",
                "Priority Support",
                "Dedicated Server",
                "Custom Dashboard"
            ],
            isFeatured: false
        },
        {
            id: 8,
            name: "Panel Bot WhatsApp — 8GB",
            category: "Panel Bot",
            price: 165000,
            description: "Panel bot WhatsApp dengan kapasitas 8GB untuk kebutuhan enterprise premium.",
            features: [
                "Kapasitas 8GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access",
                "Custom Command",
                "Priority Support",
                "Dedicated Server",
                "Custom Dashboard",
                "White Label"
            ],
            isFeatured: false
        },
        {
            id: 9,
            name: "Panel Bot WhatsApp — 9GB",
            category: "Panel Bot",
            price: 185000,
            description: "Panel bot WhatsApp dengan kapasitas 9GB untuk kebutuhan enterprise ultimate.",
            features: [
                "Kapasitas 9GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access",
                "Custom Command",
                "Priority Support",
                "Dedicated Server",
                "Custom Dashboard",
                "White Label",
                "Training Team"
            ],
            isFeatured: false
        },
        {
            id: 10,
            name: "Panel Bot WhatsApp — 10GB",
            category: "Panel Bot",
            price: 205000,
            description: "Panel bot WhatsApp dengan kapasitas 10GB untuk kebutuhan enterprise max.",
            features: [
                "Kapasitas 10GB",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access",
                "Custom Command",
                "Priority Support",
                "Dedicated Server",
                "Custom Dashboard",
                "White Label",
                "Training Team",
                "Lifetime Updates"
            ],
            isFeatured: false
        },
        {
            id: 11,
            name: "Panel Bot WhatsApp — Unlimited",
            category: "Panel Bot",
            price: 350000,
            description: "Panel bot WhatsApp dengan kapasitas unlimited untuk kebutuhan tak terbatas.",
            features: [
                "Kapasitas Unlimited",
                "Support 24/7",
                "Update otomatis",
                "Backup harian",
                "Multi-akun",
                "API Access",
                "Custom Command",
                "Priority Support",
                "Dedicated Server",
                "Custom Dashboard",
                "White Label",
                "Training Team",
                "Lifetime Updates",
                "Unlimited Users"
            ],
            isFeatured: true
        }
    ];

    // Services data
    services = [
        {
            id: 101,
            name: "Sewa Bot WhatsApp - 1 Jam",
            category: "Sewa Bot",
            price: 600,
            period: "1 Jam",
            description: "Sewa bot WhatsApp untuk penggunaan 1 jam.",
            features: [
                "Akses 1 jam penuh",
                "Semua fitur tersedia",
                "Support via WhatsApp"
            ]
        },
        {
            id: 102,
            name: "Sewa Bot WhatsApp - Mingguan",
            category: "Sewa Bot",
            price: 10000,
            period: "1 Minggu",
            description: "Sewa bot WhatsApp untuk penggunaan 1 minggu.",
            features: [
                "Akses 7 hari penuh",
                "Semua fitur tersedia",
                "Support via WhatsApp",
                "Update otomatis"
            ]
        },
        {
            id: 103,
            name: "Sewa Bot WhatsApp - Bulanan",
            category: "Sewa Bot",
            price: 20000,
            period: "1 Bulan",
            description: "Sewa bot WhatsApp untuk penggunaan 1 bulan.",
            features: [
                "Akses 30 hari penuh",
                "Semua fitur tersedia",
                "Support via WhatsApp",
                "Update otomatis",
                "Backup data"
            ]
        },
        {
            id: 104,
            name: "Sewa Bot WhatsApp - Permanen",
            category: "Sewa Bot",
            price: 35000,
            period: "Permanen",
            description: "Sewa bot WhatsApp untuk penggunaan permanen.",
            features: [
                "Akses permanen",
                "Semua fitur tersedia",
                "Support via WhatsApp",
                "Update otomatis",
                "Backup data",
                "Priority Support"
            ]
        },
        {
            id: 105,
            name: "Jadi Bot WhatsApp - 5 Hari",
            category: "Jadi Bot",
            price: 5000,
            period: "5 Hari",
            description: "Layanan jadi bot WhatsApp untuk 5 hari.",
            features: [
                "Bot siap pakai",
                "Konfigurasi awal",
                "Support via WhatsApp",
                "Akses 5 hari"
            ]
        },
        {
            id: 106,
            name: "Jadi Bot WhatsApp - 9 Hari",
            category: "Jadi Bot",
            price: 10000,
            period: "9 Hari",
            description: "Layanan jadi bot WhatsApp untuk 9 hari.",
            features: [
                "Bot siap pakai",
                "Konfigurasi awal",
                "Support via WhatsApp",
                "Akses 9 hari",
                "Custom command"
            ]
        },
        {
            id: 107,
            name: "App Premium",
            category: "Premium",
            price: 0,
            period: "Coming Soon",
            description: "Aplikasi premium dengan fitur lengkap.",
            features: [
                "Fitur lengkap",
                "Tanpa iklan",
                "Priority Support",
                "Update eksklusif"
            ]
        }
    ];

    // Banners data
    banners = [
        {
            id: 1,
            title: "Panel Bot Unlimited",
            description: "Dapatkan panel bot WhatsApp unlimited dengan harga spesial!",
            color: "gradient-1"
        },
        {
            id: 2,
            title: "Promo Bulan Ini",
            description: "Diskon 30% untuk pembelian panel bot 5GB ke atas",
            color: "gradient-2"
        },
        {
            id: 3,
            title: "Support 24/7",
            description: "Tim support kami siap membantu Anda kapan saja",
            color: "gradient-3"
        },
        {
            id: 4,
            title: "Garansi 30 Hari",
            description: "Garansi uang kembali dalam 30 hari jika tidak puas",
            color: "gradient-4"
        }
    ];

    // Save initial data to localStorage if not exists
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    if (!localStorage.getItem('services')) {
        localStorage.setItem('services', JSON.stringify(services));
    } else {
        services = JSON.parse(localStorage.getItem('services'));
    }

    if (!localStorage.getItem('banners')) {
        localStorage.setItem('banners', JSON.stringify(banners));
    } else {
        banners = JSON.parse(localStorage.getItem('banners'));
    }

    // Initialize users if not exists
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: 1,
                name: "Demo User",
                email: "demo@demo.com",
                phone: "6281234567890",
                password: "123456",
                isEmailVerified: true,
                isPhoneVerified: false,
                balance: 150000,
                joinDate: "2024-01-01",
                status: "verified"
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // Initialize transactions if not exists
    if (!localStorage.getItem('transactions')) {
        const defaultTransactions = [
            {
                id: "TRX001",
                userId: 1,
                productId: 2,
                productName: "Panel Bot WhatsApp — 2GB",
                date: "2024-03-15 14:30:00",
                amount: 45000,
                status: "paid",
                type: "purchase"
            },
            {
                id: "TRX002",
                userId: 1,
                productId: 102,
                productName: "Sewa Bot WhatsApp - Mingguan",
                date: "2024-03-10 10:15:00",
                amount: 10000,
                status: "paid",
                type: "purchase"
            },
            {
                id: "TRX003",
                userId: 1,
                productId: null,
                productName: "Deposit Saldo",
                date: "2024-03-05 09:45:00",
                amount: 100000,
                status: "paid",
                type: "deposit"
            }
        ];
        localStorage.setItem('transactions', JSON.stringify(defaultTransactions));
    }

    // Initialize deposit history if not exists
    if (!localStorage.getItem('deposits')) {
        const defaultDeposits = [
            {
                id: "DEP001",
                userId: 1,
                amount: 100000,
                fee: 0,
                total: 100000,
                date: "2024-03-05 09:45:00",
                status: "success",
                method: "QRIS"
            }
        ];
        localStorage.setItem('deposits', JSON.stringify(defaultDeposits));
    }
}

// Check login status
function checkLoginStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        isLoggedIn = true;
        updateUIForLoggedInUser();
        
        // Redirect to home if on login/register page
        const hash = window.location.hash;
        if (hash === '#/login' || hash === '#/register' || hash === '' || hash === '#') {
            window.location.hash = '#/home';
        }
    } else {
        // If not logged in and not on login/register page, redirect to login
        const hash = window.location.hash;
        if (hash !== '#/login' && hash !== '#/register' && hash !== '' && hash !== '#') {
            window.location.hash = '#/login';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Deposit amount input
    const depositAmountInput = document.getElementById('deposit-amount');
    if (depositAmountInput) {
        depositAmountInput.addEventListener('input', updateDepositSummary);
    }

    // Deposit amount presets
    document.querySelectorAll('.amount-preset').forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(this.getAttribute('data-amount'));
            document.getElementById('deposit-amount').value = amount;
            updateDepositSummary();
        });
    });

    // Generate QRIS button (Pakasir API)
    const generateQrisBtn = document.getElementById('btn-generate-qris');
    if (generateQrisBtn) {
        generateQrisBtn.addEventListener('click', generateQRISWithPakasir);
    }

    // Check payment button
    const checkPaymentBtn = document.getElementById('btn-check-payment');
    if (checkPaymentBtn) {
        checkPaymentBtn.addEventListener('click', checkPaymentStatusWithPakasir);
    }

    // Cancel deposit button
    const cancelDepositBtn = document.getElementById('btn-cancel-deposit');
    if (cancelDepositBtn) {
        cancelDepositBtn.addEventListener('click', cancelDeposit);
    }

    // Filter button
    const filterBtn = document.getElementById('filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', toggleFilter);
    }

    // Filter options
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterTransactions(filter);
            
            // Update active state
            document.querySelectorAll('.filter-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Logout button
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Edit profile button
    const editProfileBtn = document.getElementById('btn-edit-profile');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', openEditProfileModal);
    }

    // Verify phone button
    const verifyPhoneBtn = document.getElementById('btn-verify-phone');
    if (verifyPhoneBtn) {
        verifyPhoneBtn.addEventListener('click', openVerifyPhoneModal);
    }

    // Security button
    const securityBtn = document.getElementById('btn-security');
    if (securityBtn) {
        securityBtn.addEventListener('click', openSecurityModal);
    }

    // Back from produk button
    const backFromProdukBtn = document.getElementById('back-from-produk');
    if (backFromProdukBtn) {
        backFromProdukBtn.addEventListener('click', function() {
            window.history.back();
        });
    }

    // Back from payment button
    const backFromPaymentBtn = document.getElementById('back-from-payment');
    if (backFromPaymentBtn) {
        backFromPaymentBtn.addEventListener('click', function() {
            window.history.back();
        });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToPayment);
    }

    // Swipe to confirm
    const swipeThumb = document.getElementById('swipe-thumb');
    const swipeTrack = document.querySelector('.swipe-track');
    
    if (swipeThumb && swipeTrack) {
        // Touch events for mobile
        swipeThumb.addEventListener('touchstart', startSwipe);
        swipeThumb.addEventListener('touchmove', moveSwipe);
        swipeThumb.addEventListener('touchend', endSwipe);
        
        // Mouse events for desktop
        swipeThumb.addEventListener('mousedown', startSwipe);
        document.addEventListener('mousemove', moveSwipe);
        document.addEventListener('mouseup', endSwipe);
        
        // Prevent default drag behavior
        swipeThumb.addEventListener('dragstart', (e) => e.preventDefault());
    }

    // Add ripple effect to buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-primary') || 
            e.target.classList.contains('btn-outline') ||
            e.target.closest('.btn-primary') || 
            e.target.closest('.btn-outline')) {
            
            const button = e.target.classList.contains('btn-primary') || e.target.classList.contains('btn-outline') 
                ? e.target 
                : e.target.closest('.btn-primary') || e.target.closest('.btn-outline');
            
            if (button && !button.classList.contains('disabled')) {
                createRipple(button, e);
            }
        }
    });
}

// Setup routing
function setupRouting() {
    // Handle hash changes
    window.addEventListener('hashchange', handleRouteChange);
    
    // Initial route handling
    handleRouteChange();
}

function handleRouteChange() {
    const hash = window.location.hash;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Hide bottom nav initially
    document.querySelectorAll('.bottom-nav').forEach(nav => {
        nav.style.display = 'none';
    });
    
    // Show skeleton loader for page transitions
    document.getElementById('skeleton-loader').classList.remove('hidden');
    
    // Delay to show loading animation
    setTimeout(() => {
        // Show appropriate page based on hash
        let pageId = 'login-page'; // Default
        
        if (hash === '#/register') {
            pageId = 'register-page';
        } else if (hash === '#/home' && isLoggedIn) {
            pageId = 'home-page';
            loadHomePage();
        } else if (hash === '#/transaksi' && isLoggedIn) {
            pageId = 'transaksi-page';
            loadTransactionsPage();
        } else if (hash === '#/deposit' && isLoggedIn) {
            pageId = 'deposit-page';
            loadDepositPage();
        } else if (hash === '#/akun' && isLoggedIn) {
            pageId = 'akun-page';
            loadAccountPage();
        } else if (hash.startsWith('#/produk') && isLoggedIn) {
            pageId = 'produk-page';
            const productId = getProductIdFromHash(hash);
            loadProductPage(productId);
        } else if (hash === '#/payment' && isLoggedIn && currentProduct) {
            pageId = 'payment-page';
            loadPaymentPage();
        } else if (isLoggedIn) {
            // If logged in but invalid hash, go to home
            pageId = 'home-page';
            loadHomePage();
            window.location.hash = '#/home';
        } else {
            // If not logged in, go to login
            pageId = 'login-page';
            window.location.hash = '#/login';
        }
        
        // Show the page
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
            
            // Show bottom nav for main pages
            if (['home-page', 'transaksi-page', 'deposit-page', 'akun-page'].includes(pageId)) {
                const bottomNav = page.querySelector('.bottom-nav');
                if (bottomNav) {
                    bottomNav.style.display = 'flex';
                }
            }
        }
        
        // Hide skeleton loader
        document.getElementById('skeleton-loader').classList.add('hidden');
    }, 300);
}

function getProductIdFromHash(hash) {
    const match = hash.match(/id=(\d+)/);
    return match ? parseInt(match[1]) : 1;
}

// Setup modals
function setupModals() {
    // Edit profile modal
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeEditProfile = document.getElementById('close-edit-profile');
    const cancelEditProfile = document.getElementById('cancel-edit-profile');
    const editProfileForm = document.getElementById('edit-profile-form');
    
    if (closeEditProfile) {
        closeEditProfile.addEventListener('click', () => {
            editProfileModal.classList.add('hidden');
        });
    }
    
    if (cancelEditProfile) {
        cancelEditProfile.addEventListener('click', () => {
            editProfileModal.classList.add('hidden');
        });
    }
    
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', handleEditProfile);
    }
    
    // Verify phone modal
    const verifyPhoneModal = document.getElementById('verify-phone-modal');
    const closeVerifyPhone = document.getElementById('close-verify-phone');
    const sendOtpBtn = document.getElementById('btn-send-otp');
    const verifyOtpBtn = document.getElementById('btn-verify-otp');
    
    if (closeVerifyPhone) {
        closeVerifyPhone.addEventListener('click', () => {
            verifyPhoneModal.classList.add('hidden');
        });
    }
    
    if (sendOtpBtn) {
        sendOtpBtn.addEventListener('click', sendOTP);
    }
    
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener('click', verifyOTP);
    }
    
    // Security modal
    const securityModal = document.getElementById('security-modal');
    const closeSecurity = document.getElementById('close-security');
    const cancelSecurity = document.getElementById('cancel-security');
    const securityForm = document.getElementById('security-form');
    
    if (closeSecurity) {
        closeSecurity.addEventListener('click', () => {
            securityModal.classList.add('hidden');
        });
    }
    
    if (cancelSecurity) {
        cancelSecurity.addEventListener('click', () => {
            securityModal.classList.add('hidden');
        });
    }
    
    if (securityForm) {
        securityForm.addEventListener('submit', handleChangePassword);
    }
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
}

// Initialize UI components
function initUIComponents() {
    // Initialize OTP inputs
    const otpInputs = document.querySelectorAll('.otp-container input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            // Move to next input if current input is filled
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            
            // Auto submit if all inputs are filled
            const allFilled = Array.from(otpInputs).every(input => input.value.length === 1);
            if (allFilled) {
                verifyOTP();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            // Move to previous input on backspace if current input is empty
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
    if (!currentUser) return;
    
    // Update user info in home page
    const homeUsername = document.getElementById('home-username');
    const homeEmail = document.getElementById('home-email');
    const homePhone = document.getElementById('home-phone');
    const saldoAmount = document.getElementById('saldo-amount');
    const statusBadge = document.getElementById('status-badge');
    
    if (homeUsername) homeUsername.textContent = `Hello, ${currentUser.name}`;
    if (homeEmail) homeEmail.textContent = currentUser.email;
    if (homePhone) homePhone.textContent = currentUser.phone;
    if (saldoAmount) saldoAmount.textContent = formatCurrency(currentUser.balance || 0);
    
    if (statusBadge) {
        if (currentUser.status === 'verified') {
            statusBadge.innerHTML = '<i class="fas fa-shield-alt"></i><span>Verified</span>';
            statusBadge.style.background = 'linear-gradient(to right, var(--success), #1dd1a1)';
        } else {
            statusBadge.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>Unverified</span>';
            statusBadge.style.background = 'linear-gradient(to right, var(--warning), #ff9f43)';
        }
    }
}

// Load home page
function loadHomePage() {
    // Update user info
    updateUIForLoggedInUser();
    
    // Load banners
    loadBanners();
    
    // Load products
    loadProducts();
    
    // Load services
    loadServices();
    
    // Update active nav
    updateActiveNav('home');
}

function loadBanners() {
    const sliderTrack = document.querySelector('.slider-track');
    const sliderDots = document.querySelector('.slider-dots');
    
    if (!sliderTrack || !sliderDots) return;
    
    sliderTrack.innerHTML = '';
    sliderDots.innerHTML = '';
    
    banners.forEach((banner, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `slider-slide ${banner.color || 'gradient-1'}`;
        
        slide.innerHTML = `
            <div class="slide-content">
                <h3>${banner.title}</h3>
                <p>${banner.description}</p>
            </div>
        `;
        
        sliderTrack.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    // Initialize slider
    initSlider();
}

function initSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const track = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length || !track) return;
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval on interaction
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }
    
    // Touch swipe
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        resetInterval();
    });
    
    track.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', () => {
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        resetInterval();
    });
    
    // Mouse swipe for desktop
    track.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        resetInterval();
    });
    
    track.addEventListener('mousemove', (e) => {
        if (startX !== 0) {
            endX = e.clientX;
        }
    });
    
    track.addEventListener('mouseup', () => {
        if (startX !== 0 && endX !== 0) {
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
        startX = 0;
        endX = 0;
        resetInterval();
    });
    
    track.addEventListener('mouseleave', () => {
        startX = 0;
        endX = 0;
    });
    
    // Go to specific slide
    window.goToSlide = function(index) {
        if (index >= 0 && index < slides.length) {
            currentSlide = index;
            updateSlider();
            resetInterval();
        }
    };
}

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = `product-card ${product.isFeatured ? 'featured' : ''}`;
        
        productCard.innerHTML = `
            <div class="product-header">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                </div>
                ${product.isFeatured ? '<div class="product-badge">Featured</div>' : ''}
            </div>
            
            <div class="product-features">
                ${product.features.map(feature => `
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="product-price">
                <span class="price-amount">${formatCurrency(product.price)}</span>
            </div>
            
            <div class="product-actions">
                <button class="btn-outline" onclick="viewProduct(${product.id})">
                    <i class="fas fa-info-circle"></i> Detail
                </button>
                <button class="btn-primary" onclick="buyProduct(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Beli
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        serviceCard.innerHTML = `
            <div class="service-header">
                <div>
                    <h3 class="service-title">${service.name}</h3>
                    <p class="service-desc">${service.description}</p>
                </div>
            </div>
            
            <div class="service-features">
                ${service.features.map(feature => `
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="service-price">
                <span class="price-amount">${service.price > 0 ? formatCurrency(service.price) : 'Coming Soon'}</span>
                ${service.price > 0 ? `<span class="price-period">/${service.period}</span>` : ''}
            </div>
            
            ${service.price > 0 ? `
            <div class="service-actions">
                <button class="btn-primary" onclick="buyService(${service.id})">
                    <i class="fas fa-shopping-cart"></i> Beli
                </button>
            </div>
            ` : ''}
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// View product detail
function viewProduct(productId) {
    window.location.hash = `#/produk?id=${productId}`;
}

// Buy product
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    window.location.hash = '#/produk?id=' + productId;
}

// Buy service
function buyService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service || service.price <= 0) return;
    
    currentProduct = {
        id: service.id,
        name: service.name,
        price: service.price,
        description: service.description,
        type: 'service'
    };
    
    window.location.hash = '#/produk?id=' + serviceId;
}

// Load product page
function loadProductPage(productId) {
    // Determine if it's a product or service
    let item;
    let isService = false;
    
    if (productId >= 100) {
        item = services.find(s => s.id === productId);
        isService = true;
    } else {
        item = products.find(p => p.id === productId);
    }
    
    if (!item) {
        showToast('Produk tidak ditemukan', 'error');
        window.history.back();
        return;
    }
    
    currentProduct = {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        features: item.features,
        category: item.category,
        type: isService ? 'service' : 'product'
    };
    
    const produkDetail = document.getElementById('produk-detail');
    const produkTitle = document.getElementById('produk-title');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (!produkDetail || !produkTitle || !checkoutTotal) return;
    
    // Update title
    produkTitle.textContent = item.name;
    
    // Calculate admin fee (5% with minimum 1000)
    const adminFee = Math.max(1000, Math.round(item.price * 0.05));
    const total = item.price + adminFee;
    
    // Update checkout total
    checkoutTotal.textContent = formatCurrency(total);
    
    // Render product detail
    produkDetail.innerHTML = `
        <div class="produk-detail-card">
            <div class="produk-header">
                <div>
                    <h2 class="produk-title">${item.name}</h2>
                    <span class="produk-category">${item.category}</span>
                </div>
            </div>
            
            <div class="produk-price">
                ${formatCurrency(item.price)}
            </div>
            
            <div class="produk-description">
                <h4>Deskripsi</h4>
                <p>${item.description}</p>
            </div>
            
            <div class="produk-features">
                <h4>Fitur</h4>
                <div class="features-list">
                    ${item.features.map(feature => `
                        <div class="feature-list-item">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="payment-summary">
                <h3>Ringkasan Pembayaran</h3>
                <div class="summary-item">
                    <span>Harga Produk</span>
                    <span>${formatCurrency(item.price)}</span>
                </div>
                <div class="summary-item">
                    <span>Biaya Admin</span>
                    <span>${formatCurrency(adminFee)}</span>
                </div>
                <div class="summary-divider"></div>
                <div class="summary-item total">
                    <span>Total</span>
                    <span>${formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    `;
}

// Proceed to payment
function proceedToPayment() {
    if (!currentProduct) {
        showToast('Produk tidak ditemukan', 'error');
        return;
    }
    
    if (!currentUser) {
        showToast('Silakan login terlebih dahulu', 'error');
        window.location.hash = '#/login';
        return;
    }
    
    // Check if user has enough balance
    const adminFee = Math.max(1000, Math.round(currentProduct.price * 0.05));
    const total = currentProduct.price + adminFee;
    
    if (currentUser.balance < total) {
        showToast('Saldo tidak cukup. Silakan deposit terlebih dahulu.', 'error');
        window.location.hash = '#/deposit';
        return;
    }
    
    window.location.hash = '#/payment';
}

// Load payment page
function loadPaymentPage() {
    if (!currentProduct) {
        showToast('Produk tidak ditemukan', 'error');
        window.history.back();
        return;
    }
    
    const paymentProductName = document.getElementById('payment-product-name');
    const paymentProductPrice = document.getElementById('payment-product-price');
    const paymentFee = document.getElementById('payment-fee');
    const paymentTotal = document.getElementById('payment-total');
    const paymentAvailableSaldo = document.getElementById('payment-available-saldo');
    
    if (!paymentProductName || !paymentProductPrice || !paymentFee || !paymentTotal || !paymentAvailableSaldo) return;
    
    // Calculate admin fee (5% with minimum 1000)
    const adminFee = Math.max(1000, Math.round(currentProduct.price * 0.05));
    const total = currentProduct.price + adminFee;
    
    // Update payment summary
    paymentProductName.textContent = currentProduct.name;
    paymentProductPrice.textContent = formatCurrency(currentProduct.price);
    paymentFee.textContent = formatCurrency(adminFee);
    paymentTotal.textContent = formatCurrency(total);
    
    // Update available balance
    paymentAvailableSaldo.textContent = formatCurrency(currentUser.balance);
    
    // Reset swipe
    resetSwipe();
}

// Swipe to confirm functions
function startSwipe(e) {
    e.preventDefault();
    isSwiping = true;
    swipeStartX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
    const swipeThumb = document.getElementById('swipe-thumb');
    const swipeText = document.getElementById('swipe-text');
    
    if (swipeThumb) swipeThumb.style.transition = 'none';
    if (swipeText) swipeText.style.opacity = '0.5';
}

function moveSwipe(e) {
    if (!isSwiping) return;
    
    e.preventDefault();
    swipeCurrentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
    const swipeThumb = document.getElementById('swipe-thumb');
    const swipeTrack = document.querySelector('.swipe-track');
    const swipeText = document.getElementById('swipe-text');
    const swipeProgress = document.getElementById('swipe-progress');
    
    if (!swipeThumb || !swipeTrack || !swipeProgress) return;
    
    const trackWidth = swipeTrack.offsetWidth;
    const thumbWidth = swipeThumb.offsetWidth;
    const maxDistance = trackWidth - thumbWidth - 16; // 16px for margins
    
    let distance = swipeCurrentX - swipeStartX;
    distance = Math.max(0, Math.min(distance, maxDistance));
    
    const progress = distance / maxDistance;
    
    // Update thumb position
    swipeThumb.style.transform = `translateX(${distance}px)`;
    
    // Update progress bar
    swipeProgress.style.width = `${progress * 100}%`;
    
    // Update text
    if (swipeText) {
        if (progress > 0.8) {
            swipeText.innerHTML = '<span>Lepas untuk membayar</span>';
            swipeText.style.color = 'var(--white)';
        } else {
            swipeText.innerHTML = '<span>Geser ke kanan untuk bayar</span>';
            swipeText.style.color = 'var(--dark-gray)';
        }
    }
}

function endSwipe(e) {
    if (!isSwiping) return;
    
    isSwiping = false;
    
    const swipeThumb = document.getElementById('swipe-thumb');
    const swipeTrack = document.querySelector('.swipe-track');
    const swipeProgress = document.getElementById('swipe-progress');
    
    if (!swipeThumb || !swipeTrack || !swipeProgress) return;
    
    const trackWidth = swipeTrack.offsetWidth;
    const thumbWidth = swipeThumb.offsetWidth;
    const maxDistance = trackWidth - thumbWidth - 16;
    
    let distance = swipeCurrentX - swipeStartX;
    const progress = distance / maxDistance;
    
    swipeThumb.style.transition = 'transform 0.3s ease';
    swipeProgress.style.transition = 'width 0.3s ease';
    
    // Check if swipe is complete (more than 80%)
    if (progress > 0.8) {
        // Complete swipe
        swipeThumb.style.transform = `translateX(${maxDistance}px)`;
        swipeProgress.style.width = '100%';
        
        // Process payment
        setTimeout(() => {
            processPayment();
        }, 500);
    } else {
        // Reset swipe
        swipeThumb.style.transform = 'translateX(0)';
        swipeProgress.style.width = '0%';
        
        // Reset text
        const swipeText = document.getElementById('swipe-text');
        if (swipeText) {
            swipeText.innerHTML = '<span>Geser ke kanan untuk bayar</span>';
            swipeText.style.color = 'var(--dark-gray)';
            swipeText.style.opacity = '1';
        }
    }
}

function resetSwipe() {
    const swipeThumb = document.getElementById('swipe-thumb');
    const swipeProgress = document.getElementById('swipe-progress');
    const swipeText = document.getElementById('swipe-text');
    const paymentStatus = document.getElementById('payment-status');
    
    if (swipeThumb) {
        swipeThumb.style.transform = 'translateX(0)';
        swipeThumb.style.transition = 'none';
    }
    
    if (swipeProgress) {
        swipeProgress.style.width = '0%';
        swipeProgress.style.transition = 'none';
    }
    
    if (swipeText) {
        swipeText.innerHTML = '<span>Geser ke kanan untuk bayar</span>';
        swipeText.style.color = 'var(--dark-gray)';
        swipeText.style.opacity = '1';
    }
    
    if (paymentStatus) {
        paymentStatus.classList.add('hidden');
        paymentStatus.innerHTML = '';
    }
    
    isSwiping = false;
    swipeStartX = 0;
    swipeCurrentX = 0;
}

// Process payment
function processPayment() {
    if (!currentProduct || !currentUser) return;
    
    // Calculate admin fee (5% with minimum 1000)
    const adminFee = Math.max(1000, Math.round(currentProduct.price * 0.05));
    const total = currentProduct.price + adminFee;
    
    // Check if user has enough balance
    if (currentUser.balance < total) {
        showPaymentStatus('failed', 'Saldo tidak cukup. Silakan deposit terlebih dahulu.');
        return;
    }
    
    // Simulate payment processing
    showPaymentStatus('pending', 'Memproses pembayaran...');
    
    // Generate transaction ID
    const transactionId = 'TRX' + Date.now().toString().substr(-8);
    const transactionDate = new Date().toISOString().replace('T', ' ').substr(0, 19);
    
    // Simulate API call delay
    setTimeout(() => {
        // 90% success rate
        const isSuccess = Math.random() < 0.9;
        
        if (isSuccess) {
            // Update user balance
            currentUser.balance -= total;
            
            // Save updated user
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Create transaction record
            const transaction = {
                id: transactionId,
                userId: currentUser.id,
                productId: currentProduct.id,
                productName: currentProduct.name,
                date: transactionDate,
                amount: total,
                status: 'paid',
                type: 'purchase',
                adminFee: adminFee
            };
            
            // Save transaction
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            
            // Show success status
            showPaymentStatus('success', 'Pembayaran berhasil!');
            
            // Update UI
            updateUIForLoggedInUser();
            
            // Show confetti
            createConfetti();
            
            // Redirect to transactions page after 3 seconds
            setTimeout(() => {
                currentProduct = null;
                window.location.hash = '#/transaksi';
            }, 3000);
        } else {
            // Show failed status
            showPaymentStatus('failed', 'Pembayaran gagal. Silakan coba lagi.');
            
            // Reset after 3 seconds
            setTimeout(() => {
                resetSwipe();
            }, 3000);
        }
    }, 2000);
}

function showPaymentStatus(status, message) {
    const paymentStatus = document.getElementById('payment-status');
    const swipeConfirmation = document.querySelector('.swipe-confirmation');
    
    if (!paymentStatus || !swipeConfirmation) return;
    
    // Hide swipe confirmation
    swipeConfirmation.classList.add('hidden');
    
    // Show payment status
    paymentStatus.classList.remove('hidden');
    
    let icon, title, color;
    
    switch (status) {
        case 'success':
            icon = 'fas fa-check-circle';
            title = 'Pembayaran Berhasil!';
            color = 'success';
            break;
        case 'pending':
            icon = 'fas fa-clock';
            title = 'Memproses Pembayaran';
            color = 'pending';
            break;
        case 'failed':
            icon = 'fas fa-times-circle';
            title = 'Pembayaran Gagal';
            color = 'failed';
            break;
    }
    
    paymentStatus.innerHTML = `
        <div class="status-icon ${color}">
            <i class="${icon}"></i>
        </div>
        <h3>${title}</h3>
        <p>${message}</p>
        ${status === 'success' ? `
            <div class="payment-actions">
                <button class="btn-primary" onclick="window.location.hash = '#/transaksi'">
                    Lihat Transaksi
                </button>
            </div>
        ` : ''}
    `;
}

// Load transactions page
function loadTransactionsPage() {
    updateActiveNav('transaksi');
    
    if (!currentUser) return;
    
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const userTransactions = transactions.filter(t => t.userId === currentUser.id);
    
    const transactionsList = document.getElementById('transactions-list');
    const emptyState = document.getElementById('empty-transactions');
    
    if (!transactionsList || !emptyState) return;
    
    if (userTransactions.length === 0) {
        transactionsList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Sort by date (newest first)
    userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Render transactions
    transactionsList.innerHTML = userTransactions.map(transaction => {
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let statusClass = '';
        let statusText = '';
        
        switch (transaction.status) {
            case 'paid':
                statusClass = 'status-paid';
                statusText = 'Berhasil';
                break;
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'Pending';
                break;
            case 'failed':
                statusClass = 'status-failed';
                statusText = 'Gagal';
                break;
        }
        
        return `
            <div class="transaction-card ${transaction.status}">
                <div class="transaction-header">
                    <span class="transaction-id">${transaction.id}</span>
                    <span class="transaction-status ${statusClass}">${statusText}</span>
                </div>
                
                <div class="transaction-details">
                    <p class="transaction-product">${transaction.productName}</p>
                    <p class="transaction-date">${formattedDate}</p>
                </div>
                
                <div class="transaction-footer">
                    <div>
                        <span class="transaction-price">${formatCurrency(transaction.amount)}</span>
                    </div>
                    <div>
                        <span class="transaction-type">${transaction.type === 'deposit' ? 'Deposit' : 'Pembelian'}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterTransactions(filter) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const userTransactions = transactions.filter(t => t.userId === currentUser.id);
    
    let filteredTransactions = userTransactions;
    
    if (filter !== 'all') {
        filteredTransactions = userTransactions.filter(t => t.status === filter);
    }
    
    const transactionsList = document.getElementById('transactions-list');
    const emptyState = document.getElementById('empty-transactions');
    
    if (!transactionsList || !emptyState) return;
    
    if (filteredTransactions.length === 0) {
        transactionsList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Sort by date (newest first)
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Render filtered transactions
    transactionsList.innerHTML = filteredTransactions.map(transaction => {
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let statusClass = '';
        let statusText = '';
        
        switch (transaction.status) {
            case 'paid':
                statusClass = 'status-paid';
                statusText = 'Berhasil';
                break;
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'Pending';
                break;
            case 'failed':
                statusClass = 'status-failed';
                statusText = 'Gagal';
                break;
        }
        
        return `
            <div class="transaction-card ${transaction.status}">
                <div class="transaction-header">
                    <span class="transaction-id">${transaction.id}</span>
                    <span class="transaction-status ${statusClass}">${statusText}</span>
                </div>
                
                <div class="transaction-details">
                    <p class="transaction-product">${transaction.productName}</p>
                    <p class="transaction-date">${formattedDate}</p>
                </div>
                
                <div class="transaction-footer">
                    <div>
                        <span class="transaction-price">${formatCurrency(transaction.amount)}</span>
                    </div>
                    <div>
                        <span class="transaction-type">${transaction.type === 'deposit' ? 'Deposit' : 'Pembelian'}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function toggleFilter() {
    const filterContainer = document.getElementById('filter-container');
    if (filterContainer) {
        filterContainer.classList.toggle('hidden');
    }
}

// Load deposit page
function loadDepositPage() {
    updateActiveNav('deposit');
    updateDepositSummary();
    loadDepositHistory();
    
    // Update current balance
    const currentSaldo = document.getElementById('current-saldo');
    if (currentSaldo && currentUser) {
        currentSaldo.textContent = formatCurrency(currentUser.balance);
    }
}

function updateDepositSummary() {
    const amountInput = document.getElementById('deposit-amount');
    const summaryAmount = document.getElementById('summary-amount');
    const summaryFee = document.getElementById('summary-fee');
    const summaryTotal = document.getElementById('summary-total');
    
    if (!amountInput || !summaryAmount || !summaryFee || !summaryTotal) return;
    
    const amount = parseInt(amountInput.value) || 0;
    depositAmount = amount;
    
    // Calculate fee (2% with minimum 1000)
    const fee = Math.max(1000, Math.round(amount * 0.02));
    const total = amount + fee;
    
    summaryAmount.textContent = formatCurrency(amount);
    summaryFee.textContent = formatCurrency(fee);
    summaryTotal.textContent = formatCurrency(total);
}

// ============================================
// FUNGSI API PAKASIR YANG SUDAH DIINTEGRASI
// ============================================

/**
 * Generate QRIS menggunakan API Pakasir
 * Menggantikan fungsi simulasi sebelumnya
 */
async function generateQRISWithPakasir() {
    const amountInput = document.getElementById('deposit-amount');
    const qrisContainer = document.getElementById('qris-container');
    const generateBtn = document.getElementById('btn-generate-qris');
    const qrisAmount = document.getElementById('qris-amount');
    const qrisCode = document.getElementById('qris-code');
    const qrisOrderId = document.getElementById('qris-order-id');
    
    if (!amountInput || !qrisContainer || !generateBtn || !qrisAmount || !qrisCode) return;
    
    const amount = parseInt(amountInput.value) || 0;
    if (amount < 10000) {
        showToast('Minimum deposit adalah Rp 10.000', 'error');
        return;
    }
    
    // 1. Show loading state
    generateBtn.classList.add('loading');
    const btnText = generateBtn.querySelector('.btn-text');
    if (btnText) btnText.textContent = 'Membuat QRIS...';
    
    // 2. Generate a unique order ID for this transaction
    const orderId = 'DEP' + Date.now() + Math.floor(Math.random() * 1000);
    
    // 3. Calculate fee (2% with minimum 1000)
    const fee = Math.max(1000, Math.round(amount * 0.02));
    const total = amount + fee;
    
    // 4. Prepare the request to Pakasir API
    const requestData = {
        project: PAKASIR_CONFIG.PROJECT_SLUG, // Ganti dengan project slug Anda
        order_id: orderId,
        amount: amount,
        api_key: PAKASIR_CONFIG.API_KEY // API Key yang Anda berikan
    };
    
    try {
        console.log('Mengirim request ke API Pakasir:', requestData);
        
        // 5. Make the API call to create a QRIS transaction
        const response = await fetch(PAKASIR_CONFIG.API_BASE_URL + PAKASIR_CONFIG.CREATE_QRIS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        console.log('Response dari Pakasir:', result);

        if (response.ok && result.payment) {
            // 6. Success! Display the QRIS data
            const payment = result.payment;
            
            // Display the total amount (amount + fee)
            qrisAmount.textContent = formatCurrency(total);
            
            // Display order ID
            if (qrisOrderId) qrisOrderId.textContent = orderId;
            
            // 7. Generate and display QR Code from the `payment_number` string
            qrisCode.innerHTML = `<div id="qr-code-image"></div>`;
            
            // Clear any existing QR code
            if (window.qrCodeInstance) {
                window.qrCodeInstance.clear();
            }
            
            // Create new QR code
            window.qrCodeInstance = new QRCode(document.getElementById("qr-code-image"), {
                text: payment.payment_number || payment.qr_string || `https://qr.example.com/${orderId}`,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            // 8. Save transaction details for status checking
            const depositData = {
                orderId: orderId,
                amount: amount,
                fee: fee,
                total: total,
                expiredAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
                qrisContent: payment.payment_number || payment.qr_string,
                transactionData: payment
            };
            localStorage.setItem('pendingDeposit', JSON.stringify(depositData));
            
            // 9. Show QRIS container and start timer
            qrisContainer.classList.remove('hidden');
            startDepositTimer(5 * 60); // 5 minutes
            
            showToast('QRIS berhasil dibuat via Pakasir. Scan untuk melakukan pembayaran.', 'success');
        } else {
            // Handle API error
            const errorMsg = result.message || result.error || 'Unknown error';
            console.error('Pakasir API error:', errorMsg);
            showToast('Gagal membuat QRIS: ' + errorMsg, 'error');
        }
    } catch (error) {
        // Handle network error
        console.error('Generate QRIS error:', error);
        showToast('Network error. Silakan coba lagi.', 'error');
    } finally {
        // 10. Hide loading state
        generateBtn.classList.remove('loading');
        if (btnText) btnText.textContent = 'Generate QRIS via Pakasir';
    }
}

/**
 * Check payment status menggunakan API Pakasir
 * Menggantikan fungsi simulasi sebelumnya
 */
async function checkPaymentStatusWithPakasir() {
    const checkBtn = document.getElementById('btn-check-payment');
    if (!checkBtn) return;

    // Get saved transaction data
    const pendingDeposit = JSON.parse(localStorage.getItem('pendingDeposit'));
    if (!pendingDeposit) {
        showToast('Tidak ada data transaksi ditemukan', 'error');
        return;
    }

    // Show loading
    checkBtn.classList.add('loading');
    const btnText = checkBtn.querySelector('span');
    if (btnText) btnText.textContent = 'Memeriksa...';

    try {
        // 1. Call Pakasir Transaction Detail API
        const apiUrl = `${PAKASIR_CONFIG.API_BASE_URL}${PAKASIR_CONFIG.CHECK_STATUS_ENDPOINT}?project=${PAKASIR_CONFIG.PROJECT_SLUG}&order_id=${pendingDeposit.orderId}&amount=${pendingDeposit.amount}&api_key=${PAKASIR_CONFIG.API_KEY}`;
        
        console.log('Checking payment status:', apiUrl);
        const response = await fetch(apiUrl);
        const result = await response.json();
        console.log('Status response:', result);

        if (response.ok && result.transaction) {
            const transaction = result.transaction;
            
            if (transaction.status === 'completed' || transaction.status === 'success') {
                // Payment successful!
                showToast('Pembayaran berhasil! Memproses deposit...', 'success');
                processSuccessfulDeposit(pendingDeposit);
            } else if (transaction.status === 'pending') {
                showToast('Pembayaran masih pending. Silakan scan QRIS.', 'info');
            } else if (transaction.status === 'expired') {
                showToast('QRIS telah kadaluarsa. Silakan generate ulang.', 'warning');
                // Hide QRIS container
                const qrisContainer = document.getElementById('qris-container');
                if (qrisContainer) qrisContainer.classList.add('hidden');
            } else {
                showToast('Status pembayaran: ' + transaction.status, 'warning');
            }
        } else {
            // Handle case where transaction not found (might still be pending)
            const errorMsg = result.message || 'Transaksi belum ditemukan';
            showToast(errorMsg + '. Silakan coba lagi nanti.', 'info');
        }
    } catch (error) {
        console.error('Check payment error:', error);
        showToast('Network error saat cek status', 'error');
    } finally {
        // Hide loading
        checkBtn.classList.remove('loading');
        if (btnText) btnText.textContent = 'Cek Status Pembayaran';
    }
}

// Timer functions (remain the same)
function startDepositTimer(seconds) {
    const timerElement = document.getElementById('qris-timer');
    if (!timerElement) return;
    
    let remaining = seconds;
    
    updateTimerDisplay(remaining, timerElement);
    
    // Clear existing timer
    if (depositTimer) {
        clearInterval(depositTimer);
    }
    
    depositTimer = setInterval(() => {
        remaining--;
        updateTimerDisplay(remaining, timerElement);
        
        if (remaining <= 0) {
            clearInterval(depositTimer);
            showToast('QRIS telah kadaluarsa. Silakan generate ulang.', 'warning');
            
            // Hide QRIS container
            const qrisContainer = document.getElementById('qris-container');
            if (qrisContainer) {
                qrisContainer.classList.add('hidden');
            }
        }
    }, 1000);
}

function updateTimerDisplay(seconds, element) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    element.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Process successful deposit (after payment confirmed)
 */
function processSuccessfulDeposit(pendingDeposit) {
    if (!pendingDeposit || !currentUser) {
        showToast('Data deposit tidak valid', 'error');
        return;
    }
    
    // 1. Update user balance
    currentUser.balance += pendingDeposit.amount;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // 2. Create deposit record
    const depositId = pendingDeposit.orderId || 'DEP' + Date.now().toString().substr(-6);
    const deposit = {
        id: depositId,
        userId: currentUser.id,
        amount: pendingDeposit.amount,
        fee: pendingDeposit.fee || 0,
        total: pendingDeposit.total || pendingDeposit.amount,
        date: new Date().toISOString().replace('T', ' ').substr(0, 19),
        status: 'success',
        method: 'QRIS (Pakasir)',
        orderId: pendingDeposit.orderId
    };
    
    // 3. Save deposit history
    const deposits = JSON.parse(localStorage.getItem('deposits')) || [];
    deposits.push(deposit);
    localStorage.setItem('deposits', JSON.stringify(deposits));
    
    // 4. Create transaction record
    const transaction = {
        id: depositId,
        userId: currentUser.id,
        productId: null,
        productName: 'Deposit Saldo via Pakasir',
        date: new Date().toISOString().replace('T', ' ').substr(0, 19),
        amount: pendingDeposit.amount,
        status: 'paid',
        type: 'deposit'
    };
    
    // 5. Save transaction
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // 6. Clear deposit session
    localStorage.removeItem('pendingDeposit');
    
    // 7. Clear timer
    if (depositTimer) {
        clearInterval(depositTimer);
        depositTimer = null;
    }
    
    // 8. Hide QRIS container
    const qrisContainer = document.getElementById('qris-container');
    if (qrisContainer) {
        qrisContainer.classList.add('hidden');
    }
    
    // 9. Update UI
    updateUIForLoggedInUser();
    loadDepositHistory();
    
    // 10. Update current balance on deposit page
    const currentSaldo = document.getElementById('current-saldo');
    if (currentSaldo) {
        currentSaldo.textContent = formatCurrency(currentUser.balance);
    }
    
    // 11. Show success message with animation
    showToast('Deposit berhasil! Saldo telah ditambahkan.', 'success');
    
    // 12. Create flying paper animation
    createFlyingPaperAnimation();
    
    // 13. Clear QR code
    if (window.qrCodeInstance) {
        window.qrCodeInstance.clear();
        window.qrCodeInstance = null;
    }
}

function cancelDeposit() {
    if (confirm('Batalkan deposit? QRIS akan dinonaktifkan.')) {
        // Clear deposit session
        localStorage.removeItem('pendingDeposit');
        
        // Clear timer
        if (depositTimer) {
            clearInterval(depositTimer);
            depositTimer = null;
        }
        
        // Hide QRIS container
        const qrisContainer = document.getElementById('qris-container');
        if (qrisContainer) {
            qrisContainer.classList.add('hidden');
        }
        
        // Clear QR code
        if (window.qrCodeInstance) {
            window.qrCodeInstance.clear();
            window.qrCodeInstance = null;
        }
        
        showToast('Deposit dibatalkan', 'info');
    }
}

function loadDepositHistory() {
    const deposits = JSON.parse(localStorage.getItem('deposits')) || [];
    const userDeposits = deposits.filter(d => d.userId === currentUser.id);
    
    const depositHistoryList = document.getElementById('deposit-history-list');
    const emptyState = document.getElementById('empty-deposit-history');
    
    if (!depositHistoryList || !emptyState) return;
    
    if (userDeposits.length === 0) {
        depositHistoryList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Sort by date (newest first)
    userDeposits.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Render deposit history
    depositHistoryList.innerHTML = userDeposits.map(deposit => {
        const date = new Date(deposit.date);
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let statusClass = '';
        let statusText = '';
        
        switch (deposit.status) {
            case 'success':
                statusClass = 'status-success';
                statusText = 'Berhasil';
                break;
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'Pending';
                break;
            case 'failed':
                statusClass = 'status-failed';
                statusText = 'Gagal';
                break;
        }
        
        return `
            <div class="deposit-history-card">
                <div class="deposit-header">
                    <span class="deposit-id">${deposit.id}</span>
                    <span class="deposit-status ${statusClass}">${statusText}</span>
                </div>
                
                <div class="deposit-details">
                    <p class="deposit-amount">${formatCurrency(deposit.amount)}</p>
                    <p class="deposit-date">${formattedDate}</p>
                </div>
                
                <div class="deposit-footer">
                    <div>
                        <span class="deposit-method">${deposit.method}</span>
                    </div>
                    <div>
                        <span class="deposit-total">${formatCurrency(deposit.total)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load account page
function loadAccountPage() {
    updateActiveNav('akun');
    
    if (!currentUser) return;
    
    // Update profile info
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profilePhone = document.getElementById('profile-phone');
    const profileSaldo = document.getElementById('profile-saldo');
    const memberSince = document.getElementById('member-since');
    const verificationBadge = document.getElementById('verification-badge');
    const emailVerified = document.getElementById('email-verified');
    const phoneVerified = document.getElementById('phone-verified');
    
    if (profileName) profileName.textContent = currentUser.name;
    if (profileEmail) profileEmail.textContent = currentUser.email;
    if (profilePhone) profilePhone.textContent = currentUser.phone;
    if (profileSaldo) profileSaldo.textContent = formatCurrency(currentUser.balance);
    if (memberSince) memberSince.textContent = new Date(currentUser.joinDate).getFullYear();
    
    if (verificationBadge) {
        if (currentUser.isEmailVerified) {
            verificationBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>Email Terverifikasi</span>';
            verificationBadge.style.background = 'linear-gradient(to right, var(--accent), #2e86de)';
        } else {
            verificationBadge.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>Belum Terverifikasi</span>';
            verificationBadge.style.background = 'linear-gradient(to right, var(--warning), #ff9f43)';
        }
    }
    
    if (emailVerified) {
        if (currentUser.isEmailVerified) {
            emailVerified.className = 'verified-status verified';
            emailVerified.innerHTML = '<i class="fas fa-check-circle"></i> Terverifikasi';
        } else {
            emailVerified.className = 'verified-status unverified';
            emailVerified.innerHTML = '<i class="fas fa-exclamation-circle"></i> Belum Verifikasi';
        }
    }
    
    if (phoneVerified) {
        if (currentUser.isPhoneVerified) {
            phoneVerified.className = 'verified-status verified';
            phoneVerified.innerHTML = '<i class="fas fa-check-circle"></i> Terverifikasi';
        } else {
            phoneVerified.className = 'verified-status unverified';
            phoneVerified.innerHTML = '<i class="fas fa-exclamation-circle"></i> Belum Verifikasi';
        }
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const identifier = document.getElementById('login-identifier').value.trim();
    const password = document.getElementById('login-password').value;
    const loginBtn = document.querySelector('.btn-login');
    
    if (!identifier || !password) {
        showToast('Harap isi semua field', 'error');
        return;
    }
    
    // Show loading
    loginBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user by email or phone
        let user = users.find(u => 
            (u.email === identifier && u.password === password) ||
            (u.phone === identifier && u.password === password)
        );
        
        // Demo account
        if (identifier === 'demo@demo.com' && password === '123456') {
            user = users.find(u => u.email === 'demo@demo.com');
        }
        
        if (user) {
            // Login successful
            currentUser = user;
            isLoggedIn = true;
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Update UI
            updateUIForLoggedInUser();
            
            // Show success message
            showToast('Login berhasil! Selamat datang kembali.', 'success');
            
            // Redirect to home
            window.location.hash = '#/home';
        } else {
            // Login failed
            showToast('Email/nomor atau password salah', 'error');
        }
        
        // Hide loading
        loginBtn.classList.remove('loading');
    }, 1500);
}

// Handle register
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const registerBtn = document.querySelector('.btn-register');
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        showToast('Harap isi semua field', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Format email tidak valid', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showToast('Format nomor WhatsApp tidak valid (10-15 digit)', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password minimal 6 karakter', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Password tidak cocok', 'error');
        return;
    }
    
    // Show loading
    registerBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email or phone already exists
        const emailExists = users.some(u => u.email === email);
        const phoneExists = users.some(u => u.phone === phone);
        
        if (emailExists) {
            showToast('Email sudah terdaftar', 'error');
            registerBtn.classList.remove('loading');
            return;
        }
        
        if (phoneExists) {
            showToast('Nomor WhatsApp sudah terdaftar', 'error');
            registerBtn.classList.remove('loading');
            return;
        }
        
        // Create new user
        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            phone: phone,
            password: password,
            isEmailVerified: false,
            isPhoneVerified: false,
            balance: 0,
            joinDate: new Date().toISOString().split('T')[0],
            status: 'unverified'
        };
        
        // Add to users
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login
        currentUser = newUser;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Hide loading
        registerBtn.classList.remove('loading');
        
        // Show success message
        showToast('Pendaftaran berhasil! Akun Anda telah dibuat.', 'success');
        
        // Redirect to home
        window.location.hash = '#/home';
    }, 1500);
}

// Handle logout
function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // Clear current user
        currentUser = null;
        isLoggedIn = false;
        localStorage.removeItem('currentUser');
        
        // Show logout message
        showToast('Anda telah keluar', 'info');
        
        // Redirect to login
        window.location.hash = '#/login';
    }
}

// Open edit profile modal
function openEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    const editName = document.getElementById('edit-name');
    const editPhone = document.getElementById('edit-phone');
    
    if (!modal || !editName || !editPhone || !currentUser) return;
    
    // Fill form with current user data
    editName.value = currentUser.name;
    editPhone.value = currentUser.phone;
    
    // Show modal
    modal.classList.remove('hidden');
}

// Handle edit profile
function handleEditProfile(e) {
    e.preventDefault();
    
    const name = document.getElementById('edit-name').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const password = document.getElementById('edit-password').value;
    
    if (!name || !phone) {
        showToast('Harap isi nama dan nomor WhatsApp', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showToast('Format nomor WhatsApp tidak valid (10-15 digit)', 'error');
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if phone already exists (excluding current user)
    const phoneExists = users.some(u => u.phone === phone && u.id !== currentUser.id);
    
    if (phoneExists) {
        showToast('Nomor WhatsApp sudah digunakan', 'error');
        return;
    }
    
    // Update user
    const updatedUser = {
        ...currentUser,
        name: name,
        phone: phone
    };
    
    // Update password if provided
    if (password) {
        if (password.length < 6) {
            showToast('Password minimal 6 karakter', 'error');
            return;
        }
        updatedUser.password = password;
    }
    
    // Update in users array
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Update current user
    currentUser = updatedUser;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update UI
    updateUIForLoggedInUser();
    loadAccountPage();
    
    // Close modal
    document.getElementById('edit-profile-modal').classList.add('hidden');
    
    // Show success message
    showToast('Profil berhasil diperbarui', 'success');
}

// Open verify phone modal
function openVerifyPhoneModal() {
    const modal = document.getElementById('verify-phone-modal');
    const verificationPhone = document.getElementById('verification-phone');
    
    if (!modal || !verificationPhone || !currentUser) return;
    
    // Fill phone number
    verificationPhone.value = currentUser.phone;
    
    // Reset OTP input
    document.querySelectorAll('.otp-container input').forEach(input => {
        input.value = '';
    });
    
    // Hide OTP input
    document.getElementById('otp-input').classList.add('hidden');
    
    // Show modal
    modal.classList.remove('hidden');
}

// Send OTP
function sendOTP() {
    const sendBtn = document.getElementById('btn-send-otp');
    const otpInput = document.getElementById('otp-input');
    
    if (!sendBtn || !otpInput) return;
    
    // Show loading
    sendBtn.classList.add('loading');
    
    // Simulate sending OTP
    setTimeout(() => {
        // Hide loading
        sendBtn.classList.remove('loading');
        
        // Show OTP input
        otpInput.classList.remove('hidden');
        
        // Start OTP timer
        startOTPTimer(5 * 60);
        
        // Focus first OTP input
        document.getElementById('otp-1').focus();
        
        // Update step
        updateVerificationStep(2);
        
        // Show success message
        showToast('Kode OTP telah dikirim ke WhatsApp Anda', 'success');
    }, 1500);
}

// Start OTP timer
function startOTPTimer(seconds) {
    const timerElement = document.getElementById('otp-timer');
    if (!timerElement) return;
    
    let remaining = seconds;
    
    updateTimerDisplay(remaining, timerElement);
    
    otpTimer = setInterval(() => {
        remaining--;
        updateTimerDisplay(remaining, timerElement);
        
        if (remaining <= 0) {
            clearInterval(otpTimer);
            showToast('Kode OTP telah kadaluarsa', 'warning');
        }
    }, 1000);
}

// Verify OTP
function verifyOTP() {
    const verifyBtn = document.getElementById('btn-verify-otp');
    
    if (!verifyBtn) return;
    
    // Get OTP values
    const otp1 = document.getElementById('otp-1').value;
    const otp2 = document.getElementById('otp-2').value;
    const otp3 = document.getElementById('otp-3').value;
    const otp4 = document.getElementById('otp-4').value;
    const otp5 = document.getElementById('otp-5').value;
    const otp6 = document.getElementById('otp-6').value;
    
    const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    
    if (otp.length !== 6) {
        showToast('Harap masukkan 6 digit kode OTP', 'error');
        return;
    }
    
    // Show loading
    verifyBtn.classList.add('loading');
    
    // Simulate OTP verification
    setTimeout(() => {
        // 90% success rate
        const isSuccess = Math.random() < 0.9;
        
        if (isSuccess) {
            // Update user verification status
            currentUser.isPhoneVerified = true;
            currentUser.status = 'verified';
            
            // Update in localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            
            // Update step
            updateVerificationStep(3);
            
            // Update UI
            loadAccountPage();
            
            // Clear OTP timer
            if (otpTimer) {
                clearInterval(otpTimer);
            }
            
            // Close modal after 2 seconds
            setTimeout(() => {
                document.getElementById('verify-phone-modal').classList.add('hidden');
            }, 2000);
            
            // Show success message
            showToast('Verifikasi berhasil! Nomor WhatsApp Anda telah terverifikasi.', 'success');
        } else {
            // Show error message
            showToast('Kode OTP salah. Silakan coba lagi.', 'error');
        }
        
        // Hide loading
        verifyBtn.classList.remove('loading');
    }, 1500);
}

// Update verification step
function updateVerificationStep(step) {
    const steps = document.querySelectorAll('.verification-steps .step');
    
    steps.forEach((s, index) => {
        if (index + 1 <= step) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

// Open security modal
function openSecurityModal() {
    document.getElementById('security-modal').classList.remove('hidden');
}

// Handle change password
function handleChangePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;
    
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        showToast('Harap isi semua field', 'error');
        return;
    }
    
    // Check current password
    if (currentPassword !== currentUser.password) {
        showToast('Password saat ini salah', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('Password baru minimal 6 karakter', 'error');
        return;
    }
    
    if (newPassword !== confirmNewPassword) {
        showToast('Password baru tidak cocok', 'error');
        return;
    }
    
    // Update user password
    currentUser.password = newPassword;
    
    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    // Close modal
    document.getElementById('security-modal').classList.add('hidden');
    
    // Clear form
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-new-password').value = '';
    
    // Show success message
    showToast('Password berhasil diubah', 'success');
}

// Update active navigation
function updateActiveNav(activePage) {
    // Update bottom nav
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`.bottom-nav .nav-item[href="#/${activePage}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Utility functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^\d{10,15}$/;
    return re.test(phone);
}

function formatCurrency(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fas fa-info-circle';
    let title = 'Info';
    
    switch (type) {
        case 'success':
            icon = 'fas fa-check-circle';
            title = 'Sukses';
            break;
        case 'error':
            icon = 'fas fa-exclamation-circle';
            title = 'Error';
            break;
        case 'warning':
            icon = 'fas fa-exclamation-triangle';
            title = 'Peringatan';
            break;
    }
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast-content">
            <p class="toast-title">${title}</p>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'slideOutRight 0.3s forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}

function createRipple(element, event) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - radius;
    const y = event.clientY - rect.top - radius;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.classList.add('ripple');
    
    const ripple = element.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    element.appendChild(circle);
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    // Create confetti particles
    const colors = ['#25D366', '#128C7E', '#075E54', '#34B7F1', '#2ED573'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${delay}s`;
        
        confettiContainer.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

function createFlyingPaperAnimation() {
    const container = document.body;
    
    // Create flying paper elements
    for (let i = 0; i < 10; i++) {
        const paper = document.createElement('div');
        paper.innerHTML = '💸';
        paper.style.position = 'fixed';
        paper.style.fontSize = '24px';
        paper.style.zIndex = '9999';
        paper.style.pointerEvents = 'none';
        paper.style.left = `${Math.random() * 100}vw`;
        paper.style.top = '100vh';
        
        // Animation
        const animation = paper.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(-${Math.random() * 300 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            delay: i * 100
        });
        
        container.appendChild(paper);
        
        // Remove after animation
        animation.onfinish = () => {
            paper.remove();
        };
    }
}

// Global functions for onclick handlers
window.viewProduct = viewProduct;
window.buyProduct = buyProduct;
window.buyService = buyService;
window.goToSlide = function(index) {
    if (window.goToSlide) window.goToSlide(index);
};
