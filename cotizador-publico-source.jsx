const { useState } = React;
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } = Recharts;


const T=[[[[1782,1795,1814,1830,1853,1880,1909,1942,2002,2054,2104,2153,2202,2272,2303,2327,2348,2366,2415,2457,2497,2535,2573,2702,2815,2926,3036,3146,3442,3702,3959,4220,4488,4918,5308,5702,6108,6528,6321,6153,6000,5857,5721,6295,6819,7350,7898,8469,9380,10218,11070,11955,12880],[2157,2176,2202,2225,2258,2296,2338,2383,2470,2545,2617,2688,2759,2853,2894,2927,2955,2980,3046,3104,3158,3211,3264,3448,3610,3769,3927,4088,4514,4890,5265,5649,6045,6669,7239,7818,8417,9041,8821,8642,8477,8321,8174,9029,9813,10610,11435,12295,13656,14910,16189,17519,18912],[2533,2557,2590,2620,2662,2711,2766,2825,2938,3036,3130,3224,3317,3434,3486,3527,3562,3593,3678,3750,3820,3887,3954,4193,4404,4611,4819,5030,5585,6077,6571,7077,7602,8419,9170,9934,10726,11554,11321,11129,10952,10786,10626,11763,12807,13869,14971,16122,17932,19601,21307,23083,24944],[8540,8649,8803,8940,9134,9361,9615,9894,10421,10884,11336,11787,12242,12734,12953,13125,13273,13406,13778,14097,14402,14702,14998,16108,17099,18084,19081,20101,22707,25051,27436,29915,32515,36418,40041,43764,47659,51765,51296,50907,50545,50201,49869,55502,60698,66011,71542,77346,86343,94667,103197,112099,121460]],[[1950,1971,2001,2028,2066,2110,2159,2213,2274,2326,2377,2426,2474,2566,2607,2639,2667,2692,2780,2856,2929,3001,3072,3261,3429,3593,3759,3926,4354,4732,5112,5501,5904,6519,7082,7653,8245,8862,8734,8629,8531,8438,8349,9172,9922,10681,11463,12276,13913,15448,17042,18724,20513],[2398,2429,2472,2510,2564,2628,2699,2777,2864,2939,3011,3082,3153,3277,3332,3376,3413,3447,3571,3679,3782,3885,3986,4259,4500,4739,4981,5226,5845,6397,6953,7528,8126,9021,9846,10687,11561,12476,12387,12313,12245,12179,12116,13344,14467,15606,16781,18006,20452,22751,25141,27669,30361],[2847,2886,2942,2992,3063,3145,3239,3341,3454,3552,3646,3739,3831,3988,4058,4113,4160,4202,4363,4502,4636,4769,4901,5255,5571,5885,6203,6527,7335,8060,8794,9554,10348,11524,12609,13720,14876,16090,16039,15997,15957,15919,15882,17517,19013,20530,22100,23736,26991,30054,33241,36614,40210],[9379,9559,9815,10044,10371,10759,11199,11688,12211,12665,13107,13545,13983,14651,14950,15186,15390,15572,16302,16940,17560,18176,18794,20443,21934,23429,24960,26538,30335,33788,37332,41047,44976,50575,55790,61166,66808,72773,73241,73634,74005,74363,74711,82734,90102,97605,105386,113520,129515,144611,160357,177066,194922]],[[2373,2381,2393,2403,2417,2433,2450,2469,2518,2559,2599,2637,2675,2858,2941,3008,3065,3117,3250,3366,3479,3590,3701,3900,4074,4244,4415,4586,5026,5411,5794,6183,6582,7196,7754,8315,8892,9490,9655,9796,9929,10059,10186,11528,12786,14089,15464,16924,19186,21310,23513,25840,28314],[3023,3035,3051,3066,3086,3109,3135,3162,3232,3291,3348,3403,3457,3718,3838,3933,4015,4089,4278,4442,4602,4760,4919,5206,5458,5705,5953,6204,6842,7404,7966,8539,9131,10027,10844,11670,12522,13407,13750,14044,14325,14600,14872,16876,18758,20713,22779,24978,28363,31543,34848,38343,42064],[3673,3689,3710,3729,3755,3785,3819,3855,3945,4023,4096,4168,4239,4579,4734,4857,4965,5062,5305,5518,5725,5931,6137,6511,6841,7166,7492,7822,8658,9398,10138,10896,11680,12858,13934,15025,16151,17323,17843,18290,18719,19140,19557,22223,24730,27337,30094,33032,37539,41777,46184,50846,55813],[13191,13263,13363,13451,13574,13717,13875,14045,14462,14821,15165,15502,15837,17393,18112,18690,19196,19654,20760,21732,22685,23639,24601,26350,27909,29454,31015,32608,36552,40075,43637,47319,51159,56769,61932,67196,72665,78391,81599,84383,87079,89745,92408,105442,117745,130580,144200,158757,180846,201665,223353,246339,270876]],[[2381,2389,2400,2409,2422,2438,2454,2472,2521,2562,2601,2640,2677,2877,2968,3040,3103,3160,3322,3464,3603,3741,3880,4096,4287,4473,4659,4847,5313,5720,6125,6537,6959,7607,8195,8787,9395,10025,10288,10513,10729,10940,11148,12587,13931,15322,16786,18338,20642,22789,25005,27332,29794],[3035,3046,3062,3076,3095,3117,3141,3167,3237,3296,3352,3407,3461,3746,3876,3980,4071,4153,4384,4586,4785,4984,5184,5497,5774,6045,6318,6594,7271,7867,8462,9069,9696,10643,11505,12377,13275,14208,14695,15115,15520,15919,16315,18464,20477,22563,24762,27099,30546,33764,37088,40582,44283],[3689,3704,3724,3742,3767,3796,3828,3862,3952,4029,4102,4174,4244,4614,4784,4920,5039,5146,5445,5709,5967,6226,6488,6898,7260,7617,7976,8340,9229,10013,10798,11602,12433,13678,14815,15966,17155,18391,19101,19716,20310,20897,21481,24340,27022,29803,32739,35861,40451,44739,49171,53832,58773],[13273,13341,13436,13520,13637,13772,13921,14083,14497,14852,15193,15528,15859,17562,18355,18993,19553,20061,21434,22655,23862,25080,26319,28244,29962,31667,33394,35157,39356,43102,46886,50793,54865,60807,66268,71832,77606,83645,87769,91374,94887,98383,101895,115884,129049,142745,157242,172700,195212,216281,238091,261070,285460]]],[[[1853,1896,1942,1988,2038,2090,2145,2201,2253,2278,2299,2318,2334,2346,2366,2392,2422,2456,2529,2608,2692,2779,2869,3010,3166,3334,3512,3702,3928,4196,4495,4824,5186,5584,6036,6536,7083,7683,7494,7300,7107,6917,6731,7213,7757,8355,9007,9717,10418,11211,12081,13032,14067],[2257,2318,2383,2449,2521,2597,2676,2759,2829,2864,2893,2918,2941,2956,2982,3016,3055,3100,3203,3315,3434,3558,3688,3890,4115,4357,4617,4896,5222,5612,6049,6533,7068,7648,8309,9043,9852,10742,10535,10322,10109,9897,9688,10407,11221,12117,13098,14168,15215,16402,17707,19135,20693],[2662,2740,2825,2911,3005,3104,3208,3317,3405,3450,3486,3518,3547,3565,3598,3639,3688,3743,3876,4022,4175,4337,4507,4770,5063,5381,5723,6090,6516,7027,7602,8242,8950,9711,10581,11549,12620,13802,13576,13343,13109,12877,12646,13602,14685,15880,17188,18619,20013,21593,23332,25237,27318],[9142,9500,9894,10295,10738,11211,11712,12242,12625,12821,12979,13118,13245,13320,13451,13617,13813,14036,14648,15321,16039,16800,17606,18835,20222,21741,23396,25195,27214,29655,32435,35563,39067,42713,46920,51638,56900,62755,62221,61663,61100,60534,59969,64710,70106,76073,82634,89832,96766,104644,113338,122881,133330]],[[2123,2166,2213,2260,2310,2363,2418,2474,2531,2560,2584,2604,2623,2646,2687,2740,2803,2874,2986,3108,3238,3375,3519,3723,3950,4196,4460,4745,5071,5460,5899,6386,6925,7514,8189,8940,9770,10687,10509,10324,10139,9955,9773,10507,11340,12258,13263,14361,15654,17141,18803,20650,22699],[2649,2710,2777,2843,2916,2992,3071,3153,3230,3269,3301,3329,3354,3386,3443,3517,3604,3703,3863,4038,4225,4424,4633,4927,5257,5616,6004,6423,6897,7466,8110,8829,9629,10487,11472,12573,13795,15149,14976,14796,14614,14432,14251,15349,16596,17971,19481,21134,23067,25293,27785,30559,33641],[3175,3255,3341,3427,3521,3620,3724,3831,3928,3978,4018,4053,4085,4126,4199,4293,4404,4532,4740,4968,5213,5472,5748,6132,6563,7035,7547,8102,8723,9471,10320,11272,12333,13459,14755,16205,17819,19611,19442,19266,19088,18909,18730,20190,21851,23685,25699,27907,30480,33446,36768,40469,44583],[10936,11295,11688,12086,12522,12985,13472,13983,14399,14611,14783,14934,15071,15256,15580,15997,16496,17072,18030,19097,20249,21487,22814,24610,26653,28911,31394,34116,37056,40633,44731,49374,54609,59962,66166,73154,80984,89739,89559,89369,89176,88981,88784,95957,104134,113191,123168,134131,146788,161404,177809,196124,216528]],[[2718,2767,2821,2874,2931,2991,3053,3117,3232,3291,3339,3381,3420,3471,3561,3677,3817,3980,4177,4395,4629,4879,5145,5459,5810,6192,6603,7047,7531,8110,8762,9486,10286,11257,12379,13638,15044,16610,16400,16182,15963,15744,15526,16832,18327,19988,21823,23847,25906,28266,30895,33806,37023],[3520,3590,3666,3742,3823,3909,3998,4089,4252,4335,4403,4463,4517,4590,4718,4885,5086,5321,5607,5923,6265,6631,7022,7479,7992,8552,9158,9814,10521,11368,12325,13392,14577,15989,17624,19464,21523,23823,23643,23455,23264,23073,22881,24835,27074,29564,32320,35363,38446,41982,45924,50294,55127],[4323,4413,4511,4609,4716,4827,4942,5062,5272,5379,5467,5544,5614,5709,5876,6093,6356,6663,7036,7451,7900,8382,8899,9499,10173,10911,11713,12581,13510,14626,15888,17299,18867,20721,22870,25290,28003,31036,30884,30725,30563,30400,30236,32838,35820,39140,42817,46879,50986,55699,60954,66782,73230],[16238,16651,17100,17550,18040,18555,19094,19654,20604,21093,21494,21848,22171,22609,23384,24397,25630,27083,28834,30801,32944,35268,37779,40618,43837,47382,51266,55509,59928,65269,71347,78184,85836,94642,104889,116482,129531,144187,144338,144498,144660,144825,144992,157750,172394,188729,206852,226913,247064,270212,296053,324746,356534]],[[2719,2774,2832,2891,2954,3020,3089,3160,3301,3374,3433,3485,3533,3594,3702,3843,4013,4212,4416,4642,4883,5141,5415,5750,6125,6533,6974,7450,7962,8575,9264,10030,10877,11922,13130,14488,16006,17701,17547,17387,17225,17062,16900,18237,19758,21441,23291,25321,27422,29822,32486,35427,38666],[3522,3599,3683,3766,3857,3952,4051,4153,4354,4457,4542,4616,4684,4773,4928,5131,5377,5667,5963,6291,6644,7022,7425,7914,8464,9063,9714,10418,11166,12064,13078,14208,15463,16985,18749,20737,22966,25458,25360,25257,25153,25048,24942,26942,29222,31745,34523,37573,40720,44317,48312,52727,57592],[4325,4425,4533,4642,4760,4883,5012,5146,5406,5540,5650,5747,5836,5951,6154,6419,6741,7121,7509,7940,8404,8903,9436,10078,10802,11592,12452,13385,14370,15553,16891,18386,20048,22047,24368,26986,29924,33216,33172,33126,33079,33032,32984,35648,38685,42049,45754,49826,54017,58811,64138,70026,76517],[16251,16707,17205,17705,18251,18828,19432,20061,21256,21877,22387,22840,23255,23789,24736,25983,27511,29327,31153,33199,35424,37829,40423,43470,46926,50734,54906,59465,64161,69834,76285,83536,91647,101168,112261,124826,138988,154914,155590,156304,157036,157781,158537,171603,186523,203076,221338,241440,262009,285559,311755,340738,372731]]],[[[1732,1735,1740,1744,1751,1760,1771,1783,1808,1836,1864,1893,1923,1955,1980,2003,2025,2047,2087,2132,2178,2226,2276,2362,2458,2561,2669,2784,2943,3077,3207,3335,3464,3683,3933,4206,4505,4828,4778,4724,4671,4616,4562,4876,5235,5632,6066,6539,7033,7603,8236,8934,9700],[2083,2087,2093,2098,2107,2119,2133,2148,2184,2222,2261,2303,2345,2387,2420,2451,2481,2509,2565,2627,2692,2759,2829,2952,3089,3236,3393,3560,3788,3983,4171,4359,4548,4864,5227,5627,6065,6543,6523,6502,6480,6458,6435,6902,7439,8033,8686,9401,9401,9401,9401,9401,9401],[2434,2438,2446,2453,2464,2478,2495,2514,2559,2608,2659,2712,2767,2819,2861,2899,2936,2971,3043,3122,3206,3292,3383,3541,3719,3911,4117,4336,4633,4888,5136,5383,5633,6045,6520,7046,7624,8259,8268,8278,8288,8298,8309,8928,9642,10433,11306,12263,13242,14375,15640,17040,18585],[8048,8065,8096,8120,8163,8217,8281,8354,8558,8781,9016,9262,9518,9734,9906,10066,10219,10368,10690,11045,11422,11819,12234,12965,13796,14703,15688,16752,18150,19362,20554,21756,22981,24929,27196,29738,32566,35705,36167,36668,37190,37728,38281,41340,44885,48839,53218,58053,62905,68547,74863,81884,89665]],[[1926,1933,1944,1954,1970,1992,2017,2045,2075,2108,2143,2178,2214,2267,2310,2349,2387,2424,2494,2572,2655,2742,2832,2968,3120,3284,3460,3648,3868,4054,4234,4413,4593,4894,5238,5616,6029,6477,6364,6244,6124,6004,5885,6352,6892,7493,8159,8894,9692,10625,11677,12853,14165],[2363,2372,2388,2401,2424,2453,2488,2528,2570,2617,2665,2715,2766,2839,2898,2952,3004,3055,3156,3267,3385,3510,3640,3835,4055,4294,4551,4827,5145,5416,5680,5942,6207,6643,7144,7698,8304,8968,8864,8754,8643,8532,8420,9115,9921,10823,11825,12933,12933,12933,12933,12933,12933],[2800,2812,2832,2849,2878,2915,2960,3011,3065,3125,3187,3252,3318,3411,3486,3555,3622,3687,3817,3961,4115,4277,4448,4702,4989,5303,5641,6006,6422,6778,7125,7471,7820,8392,9050,9778,10580,11458,11364,11263,11161,11058,10955,11878,12951,14153,15490,16972,18556,20414,22516,24874,27515],[9034,9086,9177,9249,9377,9542,9739,9966,10210,10478,10760,11055,11362,11767,12093,12399,12695,12985,13578,14242,14957,15721,16534,17706,19052,20540,22172,23957,25924,27624,29298,30983,32698,35408,38558,42082,45996,50331,50357,50384,50412,50441,50470,54985,60263,66207,72854,80265,88041,97196,107582,119284,132431]],[[2297,2304,2318,2328,2347,2371,2399,2431,2462,2495,2529,2564,2600,2664,2715,2762,2808,2852,2933,3023,3119,3218,3323,3465,3623,3794,3975,4167,4499,4786,5067,5350,5637,5878,6146,6435,6743,7069,7004,6934,6864,6793,6722,7372,8137,9005,9982,11080,12121,13344,14727,16281,18022],[2907,2918,2937,2952,2979,3013,3054,3100,3143,3188,3236,3285,3336,3426,3498,3565,3629,3692,3808,3936,4072,4215,4365,4570,4799,5047,5312,5594,6077,6495,6908,7325,7750,8100,8492,8914,9364,9843,9812,9779,9745,9710,9676,10643,11786,13086,14556,16212,16212,16212,16212,16212,16212],[3517,3531,3556,3576,3611,3656,3709,3770,3823,3882,3943,4006,4071,4188,4281,4367,4451,4533,4683,4849,5026,5212,5408,5675,5975,6300,6649,7021,7654,8204,8748,9300,9864,10322,10837,11392,11985,12618,12620,12622,12624,12627,12629,13914,15434,17167,19129,21344,23413,25850,28614,31728,35227],[12327,12392,12507,12598,12760,12968,13217,13502,13741,14001,14272,14554,14845,15373,15797,16195,16580,16958,17643,18407,19225,20094,21015,22258,23670,25213,26884,28690,31666,34286,36904,39578,42338,44527,46994,49668,52544,55626,56128,56670,57231,57808,58398,64661,72108,80643,90360,101392,111525,123490,137105,152492,169833]],[[2290,2298,2311,2322,2341,2365,2394,2427,2462,2500,2539,2580,2622,2696,2755,2811,2864,2916,3013,3121,3236,3357,3484,3641,3817,4007,4210,4425,4766,5059,5347,5635,5928,6191,6485,6801,7139,7498,7479,7459,7439,7419,7398,8100,8925,9858,10908,12086,13187,14477,15932,17562,19383],[2897,2908,2928,2943,2970,3005,3046,3093,3142,3196,3251,3309,3368,3473,3557,3636,3712,3787,3926,4081,4246,4420,4605,4832,5088,5365,5662,5980,6476,6905,7327,7753,8186,8569,8999,9462,9957,10485,10523,10563,10604,10646,10689,11735,12968,14367,15946,17721,17721,17721,17721,17721,17721],[3504,3518,3544,3564,3599,3644,3698,3760,3823,3891,3963,4037,4114,4250,4359,4462,4561,4658,4838,5040,5255,5484,5725,6023,6359,6723,7115,7535,8185,8750,9308,9870,10445,10948,11512,12122,12776,13473,13566,13665,13768,13873,13980,15370,17010,18875,20982,23356,25546,28117,31026,34292,37951],[12269,12335,12451,12543,12707,12919,13170,13460,13741,14048,14370,14706,15054,15677,16180,16655,17116,17569,18401,19335,20342,21420,22570,23963,25549,27285,29172,31215,34288,36981,39662,42392,45198,47602,50315,53261,56434,59839,60771,61785,62843,63938,65065,71848,79889,89078,99508,111315,122049,134684,149012,165147,183267]]],[[[1741,1747,1759,1767,1783,1805,1830,1860,1914,1942,1964,1984,2002,2015,2032,2052,2075,2099,2141,2203,2276,2360,2453,2525,2632,2760,2909,3077,3255,3464,3696,3949,4226,4434,4749,5142,5611,6161,6113,6044,5966,5881,5791,5962,6215,6520,6874,7274,7766,8527,9501,10699,12153],[2092,2100,2116,2128,2150,2179,2214,2255,2331,2370,2401,2428,2453,2470,2492,2519,2547,2578,2638,2725,2830,2949,3083,3186,3338,3523,3739,3985,4241,4543,4881,5253,5662,5964,6423,6997,7688,8505,8476,8435,8387,8335,8279,8534,8912,9370,9900,10503,11236,12372,13829,15629,17822],[2442,2453,2473,2488,2516,2554,2599,2651,2748,2797,2837,2873,2905,2925,2953,2985,3020,3058,3134,3247,3383,3539,3714,3847,4045,4286,4569,4892,5226,5622,6065,6557,7098,7493,8095,8852,9765,10850,10839,10824,10806,10787,10767,11106,11609,12219,12927,13732,14706,16217,18157,20559,23490],[8050,8097,8184,8251,8377,8544,8747,8983,9415,9638,9820,9981,10128,10206,10315,10441,10580,10729,11079,11598,12229,12962,13797,14412,15336,16480,17835,19413,20979,22861,24998,27397,30079,31958,34844,38507,42978,48355,48632,49031,49495,50011,50571,52258,54763,57809,61353,65398,70220,77723,87400,99432,114190]],[[1969,1978,1995,2008,2032,2063,2102,2146,2209,2241,2267,2290,2310,2340,2382,2430,2483,2542,2608,2705,2822,2956,3108,3221,3390,3596,3838,4115,4347,4620,4921,5251,5609,5894,6325,6862,7506,8264,8124,7929,7709,7474,7230,7581,8111,8770,9556,10478,11183,12271,13661,15372,17446],[2422,2434,2458,2476,2509,2554,2608,2671,2758,2802,2838,2870,2899,2940,2998,3065,3140,3222,3316,3456,3624,3819,4040,4203,4447,4748,5101,5510,5846,6242,6683,7167,7697,8108,8733,9517,10458,11573,11422,11209,10968,10708,10437,10960,11752,12740,13921,15310,16361,17988,20070,22639,25761],[2874,2890,2920,2943,2987,3044,3114,3195,3307,3364,3410,3451,3488,3540,3614,3701,3797,3902,4025,4206,4426,4682,4972,5185,5504,5898,6364,6904,7345,7864,8444,9083,9784,10322,11142,12170,13410,14882,14718,14487,14225,13942,13645,14340,15394,16709,18285,20141,21540,23704,26479,29905,34076],[9354,9425,9559,9663,9858,10117,10434,10807,11299,11552,11759,11941,12107,12341,12671,13058,13492,13971,14532,15372,16403,17616,19018,20004,21502,23372,25617,28266,30351,32839,35643,38768,42234,44780,48679,53611,59611,66797,66407,65854,65220,64530,63798,67210,72395,78890,86703,95948,102814,113470,127173,144150,164894]],[[2467,2479,2500,2516,2546,2587,2635,2692,2800,2856,2901,2941,2977,3036,3119,3216,3325,3445,3556,3720,3920,4151,4415,4594,4861,5189,5575,6021,6331,6692,7090,7523,7991,8464,9188,10102,11212,12539,12472,12376,12266,12147,12020,12657,13626,14839,16297,18022,19137,20849,23020,25668,28849],[3149,3165,3195,3218,3260,3317,3386,3465,3619,3698,3762,3819,3871,3954,4072,4211,4368,4541,4702,4940,5230,5569,5958,6216,6605,7086,7654,8314,8763,9289,9869,10501,11187,11871,12919,14247,15864,17804,17780,17747,17709,17667,17622,18575,20025,21842,24031,26624,28293,30857,34111,38085,42866],[3831,3851,3890,3919,3974,4047,4136,4239,4437,4539,4623,4697,4764,4872,5026,5207,5411,5638,5847,6159,6540,6987,7500,7839,8350,8982,9733,10608,11196,11885,12647,13479,14384,15278,16650,18391,20515,23068,23088,23116,23149,23185,23224,24492,26423,28846,31765,35227,37449,40864,45202,50502,56883],[13765,13857,14028,14160,14409,14739,15141,15611,16514,16982,17367,17708,18020,18518,19228,20070,21028,22100,23074,24538,26347,28489,30982,32578,34998,38020,41644,45916,48718,52018,55687,59720,64130,68345,74843,83129,93298,105596,106229,107139,108200,109378,110657,116877,126360,138286,152697,169833,180738,197520,218871,245010,276538]],[[2470,2483,2507,2526,2560,2606,2662,2726,2855,2921,2975,3022,3066,3136,3236,3354,3487,3635,3753,3929,4143,4391,4673,4858,5135,5474,5872,6333,6676,7078,7522,8006,8531,9037,9810,10787,11973,13391,13352,13296,13232,13162,13087,13760,14780,16054,17582,19383,20528,22280,24493,27179,30390],[3153,3171,3205,3232,3281,3346,3424,3516,3699,3793,3871,3939,4002,4103,4247,4417,4609,4824,4996,5251,5563,5927,6344,6613,7016,7513,8100,8781,9281,9867,10515,11225,11997,12729,13852,15273,17004,19081,19099,19124,19154,19187,19223,20229,21756,23666,25959,28667,30380,33004,36321,40353,45177],[3836,3860,3904,3937,4001,4085,4187,4306,4543,4666,4767,4856,4937,5069,5257,5479,5731,6013,6238,6573,6983,7463,8015,8367,8897,9552,10328,11230,11885,12655,13508,14444,15463,16422,17893,19759,22035,24770,24844,24951,25074,25211,25358,26698,28732,31277,34336,37951,40233,43728,48149,53526,59964],[13796,13902,14100,14253,14540,14923,15392,15942,17031,17599,18069,18486,18870,19480,20353,21395,22591,23939,24990,26569,28520,30830,33516,35179,37696,40830,44577,48980,52107,55802,59922,64464,69448,73982,80968,89870,100788,113981,114877,116167,117677,119358,121190,127760,137754,150287,165382,183267,194472,211655,233420,259933,291738]]]];

const PLAZOS=[5,10,20,25],SAS=[500000,750000,1000000,5000000],PI={HNF:0,HF:1,MNF:2,MF:3};
const INF=0.04;
const UDI=8.50;
const BONO_NET_GROWTH=0.053;
const fmt=n=>new Intl.NumberFormat('es-MX',{maximumFractionDigits:0}).format(n);
const fm=n=>'$'+fmt(n);
// T[profile][plazo][sa][age-18]
const getB=(e,sx,fu,pl,sa)=>{const k=sx==='H'?(fu?'HF':'HNF'):(fu?'MF':'MNF');const p=PI[k],l=PLAZOS.indexOf(pl),s=SAS.indexOf(sa);if(p<0||l<0||s<0||e<18||e>70)return null;return(T[p][l][s][e-18]*1.069)/12;};

// Bono de Fidelidad table
const BONO_TBL=[[0,0,0,0],[.05,.15,.25,.35],[.30,.40,.50,.60],[.55,.65,.75,1]];
const getBonoPct=(plazo,primaAnual)=>{
  if(plazo<10||primaAnual<12000)return 0;
  const r=plazo<15?1:plazo<20?2:3;
  const c=primaAnual<36000?0:primaAnual<60000?1:primaAnual<90000?2:3;
  return BONO_TBL[r][c];
};

// Main projection: month-by-month with explicit Allianz charges + bono
const bP=(e,ap,rnGross,mx,plComp,isr,sa,blMensual)=>{
  const mrG=Math.pow(1+rnGross/100,1/12)-1;
  const cfUdis=isr==='151'?15:25;
  const primaAnual=ap*12;
  const bonoPct=getBonoPct(plComp,primaAnual);
  const bonoBase=bonoPct*primaAnual;
  const d=[];
  let fi=0,fr=0,month=0,acTot=0;
  for(let y=1;y<=(mx-e);y++){
    const apM=ap*Math.pow(1+INF,y-1);
    const blY=blMensual?blMensual*12*Math.pow(1+INF,y-1):0;
    const udiY=UDI*Math.pow(1+INF,y-1);
    for(let m=0;m<12;m++){
      month++;
      fi*=(1-0.001);fr*=(1-0.001);
      if(month<=18)fi+=apM;else fr+=apM;
      fi*=(1+mrG);fr*=(1+mrG);
      if(month%3===0)fi*=(1-0.015);
      if(month>18){const cf=cfUdis*udiY;if(fr>=cf)fr-=cf;else fi-=cf;}
    }
    const bono=bonoPct>0?Math.round(bonoBase*Math.pow(1+BONO_NET_GROWTH,y-1)):0;
    const sTotal=Math.round(fi+fr+bono);
    acTot+=apM*12+blY;
    const fin=y>=plComp;
    const disp=fin?sTotal:Math.round(Math.max(0,fr));
    const cRet=fin?0:0.01;
    const afterRet=Math.round(disp*(1-cRet));
    let ret=0;
    const edadR=e+y;
    // UMA diaria 2026 ≈ $113.14, anual = $41,296. Crece con inflación.
    const umaAnual=41296*Math.pow(1+INF,y-1);
    if(isr==='151'){
      if(edadR>=65&&fin){
        // Exento: hasta 90 UMAs anuales en pago único
        const exento=umaAnual*90;
        const gravado=Math.max(0,afterRet-exento);
        ret=Math.round(gravado*0.20);
      } else {
        // Antes de 65 o retiro anticipado: 20% sobre todo
        ret=Math.round(afterRet*0.20);
      }
    } else { // Art 93
      if(edadR>=60&&y>=5) ret=0; // exento por supervivencia
      else ret=Math.round(afterRet*0.20);
    }
    const dN=afterRet-ret;
    const dispPct=fin?100:(sTotal>0?Math.round((disp/sTotal)*100):0);
    const blSA=Math.round(sa*Math.pow(1+INF,y));
    d.push({edad:e+y,y,s:sTotal,fund:Math.round(fi+fr),bono,apY:Math.round(apM*12),blY:Math.round(blY),acTot:Math.round(acTot),disp,dispNeto:dN,retencion:ret,cargoRetiro:Math.round(disp*cRet),dispPct,esFinalPlazo:fin,bl:blSA,sbl:sTotal+blSA});
  }
  return d;
};

// Auto-select rendimiento based on plazo
const getRend=(plAh)=>{
  if(plAh>=21) return 12;
  if(plAh>=16) return 10;
  if(plAh>=10) return 8.5;
  return 6;
};

// Plazo limits for savings plan based on age
const getPlazoLimits=(edad)=>{
  if(edad<18) return {min:0,max:0,allowed:false};
  if(edad<=50) return {min:10,max:25,allowed:true};
  if(edad<=65) return {min:10,max:Math.max(10,75-edad),allowed:true};
  return {min:10,max:10,allowed:true,fixed:true};
};

// Aportacion limits based on plazo and ISR article
const getApLimits=(plAh,isr)=>{
  const min=plAh>=15?2000:3000;
  const max=isr==='151'?17000:25000;
  return {min,max};
};

const sL={'500000':'500 mil','750000':'750 mil','1000000':'1 millón','5000000':'5 millones'};
const pL={'5':'5 años','10':'10 años','20':'20 años','25':'25 años'};

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Manrope:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --cream:#FAF7F2;
  --cream-dark:#F0EAE0;
  --navy:#0B1D3A;
  --navy-light:#132B52;
  --gold:#C9A84C;
  --gold-light:#E8D5A0;
  --gold-dark:#A68B3C;
  --teal:#1A8A7D;
  --teal-light:#22B8A6;
  --ink:#0B1D3A;
  --ink-soft:#3F4A5C;
  --text-muted:#7A8493;
  --earth:#C9A84C;
  --earth-light:#E8D5A0;
  --sage:#1A8A7D;
  --sage-light:#A8D5CE;
}
body{background:var(--cream);color:var(--ink)}
.App{font-family:'Manrope',sans-serif;min-height:100vh;color:var(--ink);overflow-x:hidden}

/* FORM CONTAINER */
.Fc{max-width:560px;margin:0 auto;padding:0 0 60px;position:relative}

/* TOP BAR with logo */
.Tb{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;background:var(--cream)}
.Lg{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:var(--ink);letter-spacing:-0.5px}
.Lg span{color:var(--earth);font-style:italic;font-weight:400}
.Lgs{font-size:10px;color:var(--text-muted);letter-spacing:2px;text-transform:uppercase;margin-top:2px}

/* PROGRESS BAR */
.Pb{padding:4px 24px 20px}
.Pbs{display:flex;gap:8px;margin-bottom:10px}
.Pbd{flex:1;height:4px;border-radius:4px;background:var(--cream-dark);overflow:hidden;position:relative}
.Pbd.done{background:var(--sage)}
.Pbd.active{background:var(--cream-dark)}
.Pbd.active::after{content:'';position:absolute;top:0;left:0;height:100%;width:50%;background:var(--sage);animation:progressPulse 2s ease-in-out infinite}
@keyframes progressPulse{0%,100%{transform:translateX(-100%)}50%{transform:translateX(200%)}}
.Pbt{font-size:12px;color:var(--text-muted);text-align:center}
.Pbt strong{color:var(--ink);font-weight:600}

/* HERO / WELCOME on step 1 */
.Hero{padding:20px 24px 0;text-align:center}
.Hero-tag{display:inline-block;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--earth);font-weight:600;padding:6px 14px;background:var(--cream-dark);border-radius:100px;margin-bottom:16px}
.Hero-h{font-family:'Fraunces',serif;font-size:32px;line-height:1.1;color:var(--ink);margin-bottom:10px;font-weight:600;letter-spacing:-1px}
.Hero-h em{font-style:italic;color:var(--earth);font-weight:500}
.Hero-sub{font-size:14px;line-height:1.6;color:var(--ink-soft);max-width:380px;margin:0 auto}

/* STEPS */
.Step{padding:24px 24px 20px;animation:fadeSlide .5s ease both}
@keyframes fadeSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.Step-h{font-family:'Fraunces',serif;font-size:26px;line-height:1.2;color:var(--ink);margin-bottom:6px;font-weight:600;letter-spacing:-0.5px}
.Step-h em{font-style:italic;color:var(--earth)}
.Step-sub{font-size:13px;color:var(--text-muted);margin-bottom:24px;line-height:1.5}

/* INPUTS */
.Fld{margin-bottom:18px}
.Lab{display:block;font-size:12px;color:var(--ink-soft);margin-bottom:7px;font-weight:500;letter-spacing:.3px}
.Inp{width:100%;padding:14px 16px;border-radius:14px;border:1.5px solid var(--cream-dark);background:#fff;color:var(--ink);font-size:16px;outline:none;font-family:inherit;transition:all .2s}
.Inp:focus{border-color:var(--earth);box-shadow:0 0 0 4px rgba(139,90,60,.08)}
.Inp::placeholder{color:#C5B8A8}

/* ROW of 2 fields */
.Row{display:flex;gap:12px}.Row .Fld{flex:1}
.Row-ae{display:flex;gap:12px}
.Row-ae > div:first-child{flex:0 0 100px}
.Row-ae > div:last-child{flex:1}

/* BUTTON GROUP (options) */
.Bg{display:flex;gap:8px;flex-wrap:wrap}
.Bo{flex:1;padding:13px 10px;border-radius:12px;border:1.5px solid var(--cream-dark);background:#fff;color:var(--ink-soft);font-size:14px;font-weight:500;cursor:pointer;text-align:center;font-family:inherit;transition:all .2s}
.Bo:hover{border-color:var(--earth-light);background:var(--cream)}
.Bo.on{border:2px solid var(--earth);background:var(--cream);color:var(--ink);font-weight:600}
.Bo.Bx{flex:1 1 28%;padding:11px 6px;font-size:13px}

/* CARD CHOICE (for SA, deducible) */
.Cc{background:#fff;border:2px solid var(--cream-dark);border-radius:18px;padding:18px;margin-bottom:10px;cursor:pointer;transition:all .2s;position:relative}
.Cc:hover{border-color:var(--earth-light);transform:translateY(-2px);box-shadow:0 6px 20px rgba(139,90,60,.06)}
.Cc.on{border-color:var(--earth);background:var(--cream)}
.Cc.on::after{content:'✓';position:absolute;top:14px;right:14px;width:26px;height:26px;background:var(--earth);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700}
.Cc-t{font-family:'Fraunces',serif;font-size:17px;font-weight:600;color:var(--ink);margin-bottom:4px}
.Cc-d{font-size:12.5px;color:var(--ink-soft);line-height:1.5;padding-right:32px}
.Cc-ico{font-size:22px;margin-bottom:6px;display:block}

/* SLIDER */
.Rng{width:100%;accent-color:var(--earth);margin-top:8px}
.Rng-lb{display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:4px}
.Rng-val{font-family:'Fraunces',serif;font-size:28px;color:var(--earth);font-weight:600;text-align:center;margin-bottom:4px}
.Rng-hint{font-size:11px;color:var(--text-muted);text-align:center;margin-bottom:8px}

/* NAV BUTTONS */
.Nav{display:flex;gap:10px;margin-top:28px}
.Nb{padding:15px 18px;border-radius:14px;border:none;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;flex:1}
.Nb-next{background:var(--ink);color:var(--cream);flex:2;box-shadow:0 4px 16px rgba(42,35,24,.2)}
.Nb-next:hover{background:var(--earth);transform:translateY(-1px);box-shadow:0 6px 22px rgba(139,90,60,.25)}
.Nb-next:disabled{background:#C5B8A8;cursor:not-allowed;transform:none;box-shadow:none}
.Nb-back{background:transparent;color:var(--ink-soft);border:1.5px solid var(--cream-dark)}
.Nb-back:hover{background:var(--cream-dark)}

/* RESULTS PAGE */
.Rw{background:var(--cream);min-height:100vh}

.R-hero{padding:32px 24px 24px;text-align:center;position:relative}
.R-hi{font-size:12px;color:var(--text-muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px}
.R-name{font-family:'Fraunces',serif;font-size:28px;color:var(--ink);font-weight:600;letter-spacing:-0.5px;word-break:break-word}

/* MAIN CARD - big emotional headline */
.R-main{margin:0 20px 16px;background:linear-gradient(135deg,var(--sage) 0%,#5F8577 100%);border-radius:26px;padding:32px 24px;color:#fff;position:relative;overflow:hidden}
.R-main::before{content:'';position:absolute;top:-60px;right:-60px;width:180px;height:180px;background:radial-gradient(circle,rgba(255,255,255,.1),transparent 70%);border-radius:50%;pointer-events:none}
.R-main-tag{display:inline-block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.85);padding:5px 12px;background:rgba(255,255,255,.15);border-radius:100px;margin-bottom:14px;font-weight:600}
.R-main-h{font-family:'Fraunces',serif;font-size:22px;line-height:1.3;font-weight:500;margin-bottom:20px;letter-spacing:-0.3px}
.R-main-h strong{font-weight:700}
.R-main-h em{font-style:italic}
.R-nums{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}
.R-num{background:rgba(255,255,255,.1);border-radius:16px;padding:14px 10px;text-align:center;backdrop-filter:blur(10px)}
.R-num-v{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#fff;margin-bottom:2px;letter-spacing:-0.5px}
.R-num-l{font-size:10.5px;color:rgba(255,255,255,.75);text-transform:uppercase;letter-spacing:1.2px;font-weight:500}
.R-isr-note{margin-top:16px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:12px 14px;display:flex;align-items:flex-start;gap:10px;backdrop-filter:blur(10px);position:relative;z-index:1}
.R-isr-ico{font-size:16px;flex-shrink:0;line-height:1.4}
.R-isr-note span:last-child{font-size:12px;color:rgba(255,255,255,.9);line-height:1.55}
.R-isr-note strong{font-weight:700;color:#fff}

/* INVESTMENT CARD */
.R-inv{margin:0 20px 16px;background:#fff;border-radius:22px;padding:24px;text-align:center;border:1px solid var(--cream-dark)}
.R-inv-l{font-size:11px;color:var(--text-muted);letter-spacing:2px;text-transform:uppercase;font-weight:600;margin-bottom:8px}
.R-inv-v{font-family:'Fraunces',serif;font-size:44px;font-weight:700;color:var(--ink);letter-spacing:-1.5px;line-height:1}
.R-inv-v small{font-size:15px;color:var(--text-muted);font-weight:400;margin-left:2px}
.R-inv-s{font-size:12px;color:var(--text-muted);margin-top:4px;margin-bottom:18px}
.R-split{display:flex;gap:10px}
.R-sp{flex:1;background:var(--cream);border-radius:14px;padding:13px 10px}
.R-sp-v{font-family:'Fraunces',serif;font-size:19px;font-weight:600;margin-bottom:2px}
.R-sp-l{font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;font-weight:600}
.R-sp.Ahorro .R-sp-v{color:var(--sage)}
.R-sp.Proteccion .R-sp-v{color:var(--earth)}

/* BONO DE FIDELIDAD CARD */
.R-bono{margin:0 20px 16px;background:linear-gradient(135deg,#FFFCF0 0%,#FFF8E1 100%);border-radius:22px;padding:22px 20px;border:1px solid rgba(201,168,76,.25);position:relative;overflow:hidden}
.R-bono::after{content:'';position:absolute;top:-20px;right:-20px;width:90px;height:90px;background:radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%);border-radius:50%}
.R-bono-ico{font-size:28px;margin-bottom:6px}
.R-bono-t{font-family:'Fraunces',serif;font-size:17px;font-weight:600;color:var(--ink);margin-bottom:8px;letter-spacing:-0.3px}
.R-bono-d{font-size:13px;color:var(--ink-soft);line-height:1.6;margin-bottom:14px}
.R-bono-d strong{color:var(--ink);font-weight:700}
.R-bono-det{display:flex;flex-direction:column;gap:6px}
.R-bono-it{display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:6px 0;border-top:1px solid rgba(201,168,76,.15)}
.R-bono-it span{color:var(--text-muted)}
.R-bono-it strong{color:var(--ink);font-weight:600;text-align:right;font-size:11px}

/* WITHDRAWAL SCENARIO */
.R-retiro{margin:0 20px 16px;background:#fff;border-radius:22px;padding:22px 20px;border:1px solid var(--cream-dark)}
.R-retiro-t{font-family:'Fraunces',serif;font-size:17px;font-weight:600;color:var(--ink);margin-bottom:6px;letter-spacing:-0.3px}
.R-retiro-d{font-size:12px;color:var(--text-muted);line-height:1.55;margin-bottom:16px}
.R-retiro-tbl{border-radius:12px;overflow:hidden;border:1px solid var(--cream-dark)}
.R-retiro-hd{display:grid;grid-template-columns:50px 50px 1fr;gap:8px;padding:8px 14px;background:var(--cream);font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px}
.R-retiro-row{display:grid;grid-template-columns:50px 50px 1fr;gap:8px;padding:8px 14px;border-top:1px solid var(--cream);font-size:13px;color:var(--ink-soft)}
.R-retiro-row span:last-child{font-weight:600;color:var(--ink);text-align:right}
.R-retiro-fin{background:rgba(26,138,125,.05)}
.R-retiro-fin span{color:var(--sage)!important;font-weight:700!important}
.R-retiro-foot{font-size:11px;color:var(--text-muted);margin-top:12px;line-height:1.55;font-style:italic}

/* CHART CARD */
.R-ch{margin:0 20px 16px;background:#fff;border-radius:22px;padding:22px 10px 14px 10px;border:1px solid var(--cream-dark)}
.R-ch-t{font-family:'Fraunces',serif;font-size:18px;font-weight:600;color:var(--ink);padding:0 12px;margin-bottom:4px;letter-spacing:-0.3px}
.R-ch-s{font-size:12px;color:var(--text-muted);padding:0 12px;margin-bottom:12px}

/* EXTENDED PROJECTION */
.R-ext{margin:0 20px 16px;background:linear-gradient(135deg,var(--gold-light) 0%,#F0DDB0 100%);border-radius:22px;padding:24px 22px;border:1px solid var(--gold);position:relative;overflow:hidden}
.R-ext::before{content:'';position:absolute;top:-40px;right:-40px;width:140px;height:140px;background:radial-gradient(circle,rgba(11,29,58,.06),transparent 70%);border-radius:50%;pointer-events:none}
.R-ext-tag{display:inline-block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--navy);background:rgba(11,29,58,.08);padding:5px 12px;border-radius:100px;margin-bottom:12px;font-weight:700}
.R-ext-h{font-family:'Fraunces',serif;font-size:22px;font-weight:600;color:var(--navy);letter-spacing:-0.5px;margin-bottom:8px;line-height:1.25}
.R-ext-h em{font-style:italic;color:var(--gold-dark)}
.R-ext-sub{font-size:13px;color:var(--ink-soft);line-height:1.6;margin-bottom:14px}
.R-ext-sub strong{color:var(--navy);font-weight:700}
.R-ext-amt{font-family:'Fraunces',serif;font-size:36px;font-weight:700;color:var(--navy);letter-spacing:-1px;margin-bottom:6px}
.R-ext-foot{font-size:11.5px;color:var(--ink-soft);font-style:italic}

/* PRIMARY CTA - sticky hero */
.R-cta{margin:20px;padding:24px 20px;background:linear-gradient(135deg,var(--earth) 0%,#7A4E33 100%);border-radius:24px;text-align:center;color:#fff;position:relative;overflow:hidden}
.R-cta::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at top right,rgba(255,255,255,.12),transparent 50%);pointer-events:none}
.R-cta-h{font-family:'Fraunces',serif;font-size:22px;font-weight:600;margin-bottom:6px;letter-spacing:-0.3px}
.R-cta-s{font-size:13.5px;color:rgba(255,255,255,.85);line-height:1.5;margin-bottom:18px}
.CtaWa{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:17px;border-radius:16px;background:#25D366;color:#fff;font-size:16px;font-weight:700;text-decoration:none;transition:all .2s;border:none;font-family:inherit;cursor:pointer;box-shadow:0 6px 24px rgba(37,211,102,.3)}
.CtaWa:hover{background:#1fba59;transform:translateY(-2px);box-shadow:0 8px 32px rgba(37,211,102,.4)}
.CtaWa svg{flex-shrink:0}

/* DETAILS TOGGLE */
.R-det-toggle{margin:0 20px 12px;padding:16px 20px;background:#fff;border:1px solid var(--cream-dark);border-radius:16px;cursor:pointer;font-size:14px;font-weight:600;color:var(--ink);text-align:center;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:inherit;width:calc(100% - 40px)}
.R-det-toggle:hover{background:var(--cream)}
.R-det-toggle .arr{transition:transform .3s}
.R-det-toggle.open .arr{transform:rotate(180deg)}

/* EXPANDED DETAILS */
.R-det{animation:slideDown .4s ease both}
@keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}

/* PLAN DATA CARD */
.R-pd{margin:0 20px 16px;background:#fff;border-radius:22px;padding:22px;border:1px solid var(--cream-dark)}
.R-pd-t{font-family:'Fraunces',serif;font-size:17px;font-weight:600;color:var(--ink);margin-bottom:14px;letter-spacing:-0.3px}
.R-pd-g{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.R-pd-b{background:var(--cream);border-radius:14px;padding:14px 10px;text-align:center}
.R-pd-n{font-family:'Fraunces',serif;font-size:15px;font-weight:600;color:var(--ink);letter-spacing:-0.2px}
.R-pd-l{font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-top:2px;font-weight:600}

/* BLINDAJE LIST */
.R-bl{margin:0 20px 16px;background:#fff;border-radius:22px;padding:22px;border:1px solid var(--cream-dark)}
.R-bl-t{font-family:'Fraunces',serif;font-size:17px;font-weight:600;color:var(--ink);margin-bottom:4px;letter-spacing:-0.3px}
.R-bl-s{font-size:11.5px;color:var(--text-muted);margin-bottom:14px}
.R-bl-i{padding:12px 0;border-bottom:1px solid var(--cream-dark)}
.R-bl-i:last-child{border-bottom:none}
.R-bl-r{display:flex;justify-content:space-between;align-items:center;gap:10px}
.R-bl-lbl{font-size:13px;color:var(--ink-soft);flex:1}
.R-bl-v{font-size:14px;font-weight:700;color:var(--ink);text-align:right}
.R-bl-v.inc{color:var(--sage)}
.R-bl-sub{font-size:11px;color:var(--earth);text-align:right;margin-top:3px;font-style:italic}
.R-bl-note{margin-top:14px;background:var(--cream);border-left:3px solid var(--gold);border-radius:8px;padding:10px 12px;font-size:11.5px;color:var(--ink-soft);line-height:1.55;display:flex;align-items:flex-start}
.R-bl-note strong{color:var(--navy);font-weight:700}

/* TABLE */
.R-tb{margin:0 20px 16px;background:#fff;border-radius:22px;padding:22px 16px;border:1px solid var(--cream-dark);overflow-x:auto}
.R-tb-t{font-family:'Fraunces',serif;font-size:17px;font-weight:600;color:var(--ink);margin-bottom:4px;letter-spacing:-0.3px}
.R-tb-s{font-size:11px;color:var(--text-muted);margin-bottom:12px}
.Tbl{width:100%;border-collapse:collapse;font-size:11px}
.Tbl th{padding:8px 4px;text-align:right;color:var(--text-muted);font-weight:600;border-bottom:2px solid var(--ink);font-size:9.5px;text-transform:uppercase;letter-spacing:.5px}
.Tbl th:first-child,.Tbl th:nth-child(2){text-align:left}
.Tbl td{padding:8px 4px;text-align:right;border-bottom:1px solid var(--cream-dark)}
.Tbl td:first-child,.Tbl td:nth-child(2){text-align:left}
.Tbl .hl{background:var(--cream)}
.Tbl .hl td{font-weight:700;color:var(--earth)}
.Tbl-el{text-align:center!important;color:#D0C4B0;padding:4px!important;border-bottom:none!important}

/* QUOTE / THINK */
.R-qt{margin:20px;padding:28px 24px;background:var(--ink);border-radius:24px;color:var(--cream);text-align:center;position:relative;overflow:hidden}
.R-qt::before{content:'"';font-family:'Fraunces',serif;font-size:120px;position:absolute;top:-20px;left:10px;color:rgba(212,165,116,.15);line-height:1;font-weight:600}
.R-qt-txt{font-size:14px;line-height:1.8;color:rgba(253,248,241,.85);position:relative;z-index:1}
.R-qt-txt strong{color:var(--gold)}
.R-qt-slogan{font-family:'Fraunces',serif;font-style:italic;font-size:20px;color:var(--gold);margin-top:16px;display:block;position:relative;z-index:1}

/* FOOTER */
.Ft{text-align:center;padding:32px 24px 40px;background:var(--cream)}
.Ft-lg{font-family:'Fraunces',serif;font-size:18px;color:var(--ink);font-weight:600;margin-bottom:2px}
.Ft-lg em{color:var(--earth);font-style:italic}
.Ft-tag{font-size:10px;color:var(--text-muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:18px}
.Ft-more{display:inline-block;padding:10px 20px;background:#fff;border:1.5px solid var(--cream-dark);border-radius:100px;color:var(--ink);font-size:13px;font-weight:600;text-decoration:none;margin-bottom:18px;transition:all .2s}
.Ft-more:hover{border-color:var(--earth);background:var(--cream-dark)}
.Ft-sr{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-bottom:16px}
.Ft-sl{font-size:12px;color:var(--earth);text-decoration:none;font-weight:500}
.Ft-sl:hover{text-decoration:underline}
.Ft-dis{font-size:10px;color:var(--text-muted);line-height:1.7;max-width:480px;margin:0 auto}

/* RECHARTS tweaks */
.recharts-legend-item-text{color:var(--ink-soft)!important;font-size:11px!important}
.recharts-cartesian-axis-tick-value{fill:var(--text-muted)!important}

/* PDF BUTTON */
.Pdf-btn{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 20px 16px;padding:14px 18px;background:#fff;border:1.5px solid var(--cream-dark);border-radius:16px;font-size:14px;font-weight:600;color:var(--ink);cursor:pointer;font-family:inherit;transition:all .2s;width:calc(100% - 40px)}
.Pdf-btn:hover{background:var(--cream);border-color:var(--gold)}
.Pdf-btn:disabled{opacity:.6;cursor:wait;background:var(--cream-dark)}

@media (min-width:600px){
  .Hero-h{font-size:40px}
  .Step-h{font-size:30px}
}
@media print{
.no-print{display:none!important}
*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}
html,body{background:#fff!important;margin:0!important;padding:0!important}
.App,.Rw{background:#fff!important;min-height:auto!important}
.Fc{max-width:100%!important;padding:0!important}
.Tb{padding:12px 20px!important}
.R-hero{padding:16px 20px 8px!important}
.R-name{font-size:24px!important}
.R-main{margin:8px 16px!important;padding:22px 18px!important;page-break-inside:avoid!important;break-inside:avoid!important}
.R-main::before{display:none!important}
.R-main-h{font-size:18px!important}
.R-num-v{font-size:18px!important}
.R-isr-note{margin-top:12px!important}
.R-inv{margin:8px 16px!important;padding:18px!important;page-break-inside:avoid!important;break-inside:avoid!important}
.R-inv-v{font-size:34px!important}
.R-ch{margin:8px 16px!important;page-break-inside:avoid!important;break-inside:avoid!important}
.recharts-wrapper,.recharts-surface,.recharts-responsive-container{overflow:visible!important}
.recharts-responsive-container{min-height:260px!important;height:260px!important}
.R-ext{margin:8px 16px!important;page-break-inside:avoid!important;break-inside:avoid!important}
.R-ext-amt{font-size:28px!important}
.R-cta{margin:8px 16px!important;page-break-inside:avoid!important;break-inside:avoid!important}
.CtaWa{display:none!important}
.R-cta-s{display:none!important}
.R-cta-h::after{content:' Solicita tu propuesta formal por WhatsApp al 999 129 9740';font-size:13px;font-weight:400;display:block;margin-top:6px}
.R-det-toggle{display:none!important}
.R-det{display:block!important}
.R-pd,.R-bl,.R-tb{margin:8px 16px!important;page-break-inside:avoid!important;break-inside:avoid!important}
.R-qt{margin:8px 16px!important;page-break-inside:avoid!important;break-inside:avoid!important}
.R-qt::before{display:none!important}
.Ft{padding:16px 20px 20px!important}
.Ft-more{display:none!important}
.Ft-dis{font-size:8px!important;max-width:100%!important}
.Tbl{font-size:10px!important}
.Tbl th,.Tbl td{padding:5px 3px!important}
.Pdf-btn{display:none!important}
}
`;

function App(){
  const [step,setStep]=useState(0); // 0=hero, 1,2,3=steps, 4=result
  const [showDetails,setShowDetails]=useState(false);
  const [f,setF]=useState({
    nm:'',tel:'',email:'',
    edad:35,sx:'H',fu:false,
    ap:3000,plAh:20,isr:'93',
    sa:1000000,pl:20
  });
  const [R,setR]=useState(null);
  const u=(k,v)=>setF(p=>({...p,[k]:v}));

  const calc=()=>{
    const ageOK=f.edad>=18&&f.edad<=70;
    const bl=ageOK?getB(f.edad,f.sx,f.fu,f.pl,f.sa):null;
    if(ageOK&&!bl){alert('Esta combinación de edad y plazo de protección no está disponible. Intenta con un plazo diferente.');return;}
    const rn=getRend(f.plAh);
    const edadFinal=f.edad+f.plAh;
    const plComp=Math.min(f.plAh,25);
    const proj=bP(f.edad,f.ap,rn,edadFinal,plComp,f.isr,ageOK?f.sa:0,bl||0);
    // Bono info
    const primaAnual=f.ap*12;
    const bonoPct=getBonoPct(plComp,primaAnual);
    const bonoFinal=proj.length>0?proj[proj.length-1].bono:0;
    // Extended projection: if edadFinal < 65, simulate continued contributions until 65
    let projExtended=null;
    let proj65Rows=[];
    if(edadFinal<65){
      const extraYears=65-edadFinal;
      const lastEntry=proj[proj.length-1];
      // Continue using explicit charges model for extended projection
      const projExt=bP(f.edad,f.ap,rn,65,plComp,f.isr,ageOK?f.sa:0,bl||0);
      // Take only the rows after the main plan ends
      for(let i=proj.length;i<projExt.length;i++){
        const r=projExt[i];
        proj65Rows.push({...r,ext:true});
      }
      projExtended={
        edad65:65,
        saldo65:projExt.length>0?projExt[projExt.length-1].s:0,
        anosExtra:extraYears
      };
    }
    setR({
      bl:bl||0,
      tot:bl?(f.ap+bl):f.ap,
      proj,
      proj65Rows,
      cov:bl?{p:f.sa,s:150000,i:f.sa,u:Math.round(Math.min(f.sa*0.30,65*113.14*30.4))}:null,
      rn,edadFinal,plAh:f.plAh,
      proteccionDisponible:!!bl,
      projExtended,
      bonoPct,
      bonoFinal
    });
    setStep(4);
    setShowDetails(false);
    setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),50);
  };

  const [pdfLoading,setPdfLoading]=useState(false);
  const generarPDF=()=>{
    if(!showDetails) setShowDetails(true);
    setPdfLoading(true);
    setTimeout(()=>{
      // On desktop (width > 640px), use native print which respects @media print CSS perfectly
      const isDesktop=window.innerWidth>640;
      if(isDesktop){
        window.print();
        setPdfLoading(false);
        return;
      }
      // On mobile, use html2pdf library
      const loadLib=()=>{
        if(window.html2pdf){crearPDF();return;}
        const s=document.createElement('script');
        s.src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        s.onload=crearPDF;
        s.onerror=()=>{setPdfLoading(false);alert('Error de conexión. Intenta de nuevo.');};
        document.head.appendChild(s);
      };
      const crearPDF=()=>{
        const el=document.querySelector('.Fc');
        const nombre=(f.nm.split(' ')[0]||'Plan');
        window.html2pdf().set({
          margin:[6,4,6,4],
          filename:'Propuesta-CARSA-'+nombre+'.pdf',
          image:{type:'jpeg',quality:0.92},
          html2canvas:{scale:2,useCORS:true,scrollY:-window.scrollY,scrollX:0,logging:false,windowWidth:480},
          jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},
          pagebreak:{mode:['avoid-all','css','legacy']}
        }).from(el).save().then(()=>{
          setPdfLoading(false);
        }).catch(()=>{
          setPdfLoading(false);
          alert('No se pudo generar el PDF. Intenta de nuevo.');
        });
      };
      loadLib();
    },800);
  };

  // Validations
  const step1Valid=f.nm.trim().length>=2 && f.edad>=18 && f.edad<=80 && f.tel.trim().length>=10 && f.email.includes('@');
  const plazoLimits=getPlazoLimits(f.edad);
  const apLimits=getApLimits(f.plAh,f.isr);
  const step2Valid=f.ap>=apLimits.min && f.ap<=apLimits.max && f.plAh>=plazoLimits.min && f.plAh<=plazoLimits.max && plazoLimits.allowed;
  const step3Valid=f.sa && f.pl;
  // Protection age limits (insurer's tariff covers 25-55 only)
  const proteccionDisponible=f.edad>=18 && f.edad<=70;

  const Progress=({current})=>{
    return(
      <div className="Pb">
        <div className="Pbs">
          {[1,2,3].map(n=>(
            <div key={n} className={`Pbd ${n<current?'done':''} ${n===current?'active':''}`}/>
          ))}
        </div>
        <p className="Pbt">Paso <strong>{current}</strong> de 3</p>
      </div>
    );
  };

  // STEP 0: Welcome
  if(step===0) return(
    <div className="App"><style>{CSS}</style>
      <div className="Fc">
        <div className="Tb">
          <div>
            <div className="Lg">CARSA <span>seguros y fianzas</span></div>
            <div className="Lgs">Desde 1998</div>
          </div>
        </div>
        <div className="Hero">
          <span className="Hero-tag">🌿 Tu plan · Tu ritmo</span>
          <h1 className="Hero-h">Construye tu <em>futuro</em><br/>y protege a los <em>tuyos</em></h1>
          <p className="Hero-sub">Diseña en menos de 2 minutos tu plan de ahorro y protección. Sin presiones, sin llamadas, a tu ritmo.</p>
          <button className="Nb Nb-next" style={{marginTop:28,width:'100%'}} onClick={()=>setStep(1)}>Comenzar mi plan →</button>
          <p style={{fontSize:11,color:'var(--text-muted)',marginTop:16}}>🔒 Tu información es privada y segura</p>
        </div>
        <div style={{padding:'48px 24px 24px',borderTop:'1px solid var(--cream-dark)',marginTop:40}}>
          <p style={{fontSize:11,color:'var(--text-muted)',letterSpacing:2,textTransform:'uppercase',textAlign:'center',marginBottom:16,fontWeight:600}}>¿Para qué sirve?</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr',gap:14}}>
            {[
              {ico:'🌱',t:'Ahorro a largo plazo',d:'Construye un capital para el futuro que tú elijas: retiro, estudios, patrimonio familiar.'},
              {ico:'🛡️',t:'Protección a tu familia',d:'Si algo te pasa, ellos cuentan con un respaldo económico firme.'},
              {ico:'📊',t:'Rendimientos reales',d:'Tu dinero crece invertido en fondos globales diversificados.'}
            ].map((x,i)=>(
              <div key={i} style={{background:'#fff',border:'1px solid var(--cream-dark)',borderRadius:16,padding:'16px 18px',display:'flex',gap:14,alignItems:'flex-start'}}>
                <span style={{fontSize:22,flexShrink:0}}>{x.ico}</span>
                <div>
                  <div style={{fontFamily:'Fraunces,serif',fontSize:15,fontWeight:600,color:'var(--ink)',marginBottom:2}}>{x.t}</div>
                  <div style={{fontSize:12.5,color:'var(--ink-soft)',lineHeight:1.5}}>{x.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // STEP 1: Personal data
  if(step===1) return(
    <div className="App"><style>{CSS}</style>
      <div className="Fc">
        <div className="Tb">
          <div className="Lg">CARSA <span>seguros y fianzas</span></div>
        </div>
        <Progress current={1}/>
        <div className="Step">
          <h2 className="Step-h">Cuéntanos <em>sobre ti</em></h2>
          <p className="Step-sub">Necesitamos estos datos para calcular tu plan personalizado.</p>

          <div className="Fld">
            <label className="Lab">Tu nombre completo</label>
            <input className="Inp" placeholder="Ej. María García López" value={f.nm} onChange={e=>u('nm',e.target.value)}/>
          </div>

          <div className="Row-ae">
            <div className="Fld">
              <label className="Lab">Edad</label>
              <input className="Inp" inputMode="numeric" pattern="[0-9]*" placeholder="35" value={f.edad} onChange={e=>u('edad',e.target.value)} onBlur={e=>{const v=Math.min(80,Math.max(18,parseInt(e.target.value)||35));u('edad',v);}}/>
            </div>
            <div className="Fld">
              <label className="Lab">Sexo</label>
              <div className="Bg">
                <button className={`Bo ${f.sx==='H'?'on':''}`} onClick={()=>u('sx','H')}>Hombre</button>
                <button className={`Bo ${f.sx==='M'?'on':''}`} onClick={()=>u('sx','M')}>Mujer</button>
              </div>
            </div>
          </div>

          <div className="Fld">
            <label className="Lab">¿Fumas actualmente?</label>
            <div className="Bg">
              <button className={`Bo ${!f.fu?'on':''}`} onClick={()=>u('fu',false)}>No fumo</button>
              <button className={`Bo ${f.fu?'on':''}`} onClick={()=>u('fu',true)}>Sí fumo</button>
            </div>
          </div>

          <div className="Fld">
            <label className="Lab">Teléfono (WhatsApp)</label>
            <input className="Inp" inputMode="tel" placeholder="10 dígitos" value={f.tel} onChange={e=>u('tel',e.target.value)}/>
          </div>

          <div className="Fld">
            <label className="Lab">Correo electrónico</label>
            <input className="Inp" type="email" placeholder="tu@correo.com" value={f.email} onChange={e=>u('email',e.target.value)}/>
          </div>

          <p style={{fontSize:11,color:'var(--text-muted)',lineHeight:1.6,marginTop:6,textAlign:'center'}}>📝 Tus datos se usarán solo para enviarte tu propuesta personalizada. No compartimos tu información.</p>

          <div className="Nav">
            <button className="Nb Nb-back" onClick={()=>setStep(0)}>Atrás</button>
            <button className="Nb Nb-next" disabled={!step1Valid} onClick={()=>setStep(2)}>Continuar →</button>
          </div>
        </div>
      </div>
    </div>
  );

  // STEP 2: Ahorro
  if(step===2){
    // Auto-clamp plazo to valid range whenever entering step 2
    const lim=getPlazoLimits(f.edad);
    if(f.plAh<lim.min||f.plAh>lim.max){
      setTimeout(()=>u('plAh',Math.min(lim.max,Math.max(lim.min,f.plAh))),0);
    }
    // Auto-clamp aportacion if out of range for current plazo/isr
    const al=getApLimits(f.plAh,f.isr);
    if(f.ap<al.min||f.ap>al.max){
      setTimeout(()=>u('ap',Math.min(al.max,Math.max(al.min,f.ap))),0);
    }
    const rn=getRend(f.plAh);
    return(
      <div className="App"><style>{CSS}</style>
        <div className="Fc">
          <div className="Tb">
            <div className="Lg">CARSA <span>seguros y fianzas</span></div>
          </div>
          <Progress current={2}/>
          <div className="Step">
            <h2 className="Step-h">¿Cuánto quieres <em>ahorrar</em>?</h2>
            <p className="Step-sub">Define cuánto puedes aportar cada mes y por cuánto tiempo.</p>

            <div className="Fld">
              <label className="Lab">Aportación mensual</label>
              <div style={{position:'relative'}}>
                <span style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)',fontSize:16,color:'var(--text-muted)',fontWeight:600,pointerEvents:'none'}}>$</span>
                <input className="Inp" style={{paddingLeft:32}} inputMode="numeric" pattern="[0-9]*" value={f.ap} onChange={e=>u('ap',e.target.value)} onBlur={e=>{const v=Math.min(apLimits.max,Math.max(apLimits.min,parseInt(e.target.value)||apLimits.min));u('ap',v);}}/>
              </div>
              <p style={{fontSize:11,color:f.ap>=apLimits.min&&f.ap<=apLimits.max?'var(--text-muted)':'#c44',marginTop:6}}>
                De {fm(apLimits.min)} a {fm(apLimits.max)} MXN mensuales{f.isr==='151'?' (plan deducible)':''}.
              </p>
            </div>

            <div className="Fld">
              <label className="Lab">¿Por cuántos años quieres ahorrar?</label>
              <div style={{background:'#fff',border:'1.5px solid var(--cream-dark)',borderRadius:16,padding:'18px 16px 14px'}}>
                <div className="Rng-val">{f.plAh} <small style={{fontSize:14,color:'var(--text-muted)'}}>años</small></div>
                {lim.fixed?(
                  <p style={{fontSize:12,color:'var(--text-muted)',textAlign:'center',marginTop:4,fontStyle:'italic'}}>Plazo único disponible para tu edad</p>
                ):(
                  <>
                    <input type="range" min={lim.min} max={lim.max} value={f.plAh} onChange={e=>u('plAh',+e.target.value)} className="Rng"/>
                    <div className="Rng-lb"><span>{lim.min} años</span><span>{lim.max} años</span></div>
                  </>
                )}
                <p style={{fontSize:11,color:'var(--text-muted)',marginTop:10,textAlign:'center',fontStyle:'italic'}}>
                  Tu plan terminaría a los {f.edad+f.plAh} años · Rendimiento estimado: <strong style={{color:'var(--earth)'}}>{rn}% anual</strong>
                </p>
              </div>
            </div>

            <div className="Fld" style={{marginTop:24}}>
              <label className="Lab" style={{fontSize:13,color:'var(--ink)',fontWeight:600,marginBottom:10}}>¿Quieres aprovechar los beneficios fiscales?</label>
              <div className="Cc" onClick={()=>u('isr','151')} style={{borderColor:f.isr==='151'?'var(--earth)':'var(--cream-dark)',background:f.isr==='151'?'var(--cream)':'#fff'}}>
                {f.isr==='151'&&<span style={{position:'absolute',top:14,right:14,width:26,height:26,background:'var(--earth)',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700}}>✓</span>}
                <span className="Cc-ico">💰</span>
                <div className="Cc-t">Sí, quiero deducir mis aportaciones</div>
                <div className="Cc-d">Reduces tu pago anual de ISR. Ideal si declaras impuestos como persona física.</div>
              </div>
              <div className="Cc" onClick={()=>u('isr','93')} style={{borderColor:f.isr==='93'?'var(--earth)':'var(--cream-dark)',background:f.isr==='93'?'var(--cream)':'#fff'}}>
                {f.isr==='93'&&<span style={{position:'absolute',top:14,right:14,width:26,height:26,background:'var(--earth)',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700}}>✓</span>}
                <span className="Cc-ico">🌿</span>
                <div className="Cc-t">Prefiero un plan más flexible</div>
                <div className="Cc-d">Sin restricciones al retirar. Ideal si no declaras o quieres total libertad sobre tu dinero.</div>
              </div>
            </div>

            <div className="Nav">
              <button className="Nb Nb-back" onClick={()=>setStep(1)}>Atrás</button>
              <button className="Nb Nb-next" disabled={!step2Valid} onClick={()=>setStep(3)}>Continuar →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: Protección
  if(step===3){
    return(
      <div className="App"><style>{CSS}</style>
        <div className="Fc">
          <div className="Tb">
            <div className="Lg">CARSA <span>seguros y fianzas</span></div>
          </div>
          <Progress current={3}/>
          <div className="Step">
            <h2 className="Step-h">Protege a los <em>tuyos</em></h2>
            <p className="Step-sub">Define una suma que respalde económicamente a tu familia si algo te llega a pasar.</p>

            {!proteccionDisponible?(
              <div style={{background:'linear-gradient(135deg,#FAF7F2 0%,#F0EAE0 100%)',border:'1.5px solid var(--gold-light)',borderRadius:18,padding:'26px 22px',textAlign:'center',position:'relative',overflow:'hidden'}}>
                <div style={{fontSize:34,marginBottom:10}}>✨</div>
                <p style={{fontFamily:'Fraunces,serif',fontSize:19,fontWeight:600,color:'var(--navy)',marginBottom:10,letterSpacing:'-0.3px'}}>Tu plan merece atención personal</p>
                <p style={{fontSize:13,color:'var(--ink-soft)',lineHeight:1.65,marginBottom:4}}>
                  Por tu edad, diseñamos tu propuesta de protección <strong style={{color:'var(--navy)'}}>a la medida</strong>. Continúa con tu plan de ahorro y un asesor te contactará para armar la combinación ideal contigo.
                </p>
              </div>
            ):(
              <>
                <div className="Fld">
                  <label className="Lab">¿Cuánto quieres dejar de respaldo a tu familia?</label>
                  <div className="Bg" style={{flexDirection:'column',gap:10}}>
                    {SAS.map(s=>(
                      <button key={s} className="Cc" onClick={()=>u('sa',s)} style={{borderColor:f.sa===s?'var(--earth)':'var(--cream-dark)',background:f.sa===s?'var(--cream)':'#fff',textAlign:'left',padding:'16px 20px'}}>
                        {f.sa===s&&<span style={{position:'absolute',top:14,right:14,width:26,height:26,background:'var(--earth)',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700}}>✓</span>}
                        <div style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700,color:'var(--ink)',letterSpacing:'-0.5px'}}>${sL[s]} <span style={{fontSize:12,color:'var(--text-muted)',fontWeight:400,fontFamily:'Manrope'}}>MXN</span></div>
                        <div style={{fontSize:11.5,color:'var(--ink-soft)',marginTop:2}}>
                          {s===500000&&'Respaldo básico'}
                          {s===750000&&'Respaldo intermedio'}
                          {s===1000000&&'Respaldo robusto'}
                          {s===5000000&&'Respaldo premium'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="Fld">
                  <label className="Lab">¿Por cuántos años?</label>
                  <div className="Bg">
                    {PLAZOS.map(p=>(
                      <button key={p} className={`Bo Bx ${f.pl===p?'on':''}`} onClick={()=>u('pl',p)}>{pL[p]}</button>
                    ))}
                  </div>
                  <p style={{fontSize:11,color:'var(--text-muted)',marginTop:6}}>💡 Tip: elige un plazo similar al de tu plan de ahorro.</p>
                </div>
              </>
            )}

            <div className="Nav">
              <button className="Nb Nb-back" onClick={()=>setStep(2)}>Atrás</button>
              <button className="Nb Nb-next" disabled={proteccionDisponible&&!step3Valid} onClick={calc}>Ver mi propuesta →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 4: RESULTS
  const last=R.proj[R.proj.length-1];
  const nm=f.nm.split(' ')[0]||'Estimado(a)';
  const c=R.cov;
  const hasProteccion=R.proteccionDisponible;

  const waMsg=encodeURIComponent(
    `¡Hola CARSA Seguros y Fianzas! Me interesa recibir mi propuesta formal.\n\n`+
    `👤 *Datos:*\n`+
    `• Nombre: ${f.nm}\n`+
    `• Edad: ${f.edad} años\n`+
    `• Teléfono: ${f.tel}\n`+
    `• Email: ${f.email}\n\n`+
    `💰 *Ahorro:*\n`+
    `• Aportación mensual: ${fm(f.ap)}\n`+
    `• Plazo: ${R.plAh} años (hasta edad ${R.edadFinal})\n`+
    `• Saldo estimado: ${fm(last?.s||0)}\n`+
    `• Plan ${f.isr==='151'?'deducible (Art. 151)':'flexible (Art. 93)'}\n\n`+
    (hasProteccion?
      `🛡️ *Protección:*\n`+
      `• Suma asegurada: ${fm(c.p)}\n`+
      `• Plazo: ${pL[f.pl]}\n\n`+
      `💵 *Total mensual año 1: ${fm(Math.round(R.tot))}*\n\n`
      :
      `🛡️ *Protección:* Requiere asesoría personalizada por mi rango de edad.\n\n`+
      `💵 *Aportación mensual ahorro: ${fm(f.ap)}*\n\n`
    )+
    `Agradezco me envíen la propuesta formal detallada.`
  );
  const waLink=`https://wa.me/5219991299740?text=${waMsg}`;

  return(
    <div className="App Rw"><style>{CSS}</style>
      <div className="Fc">
        <div className="Tb">
          <div className="Lg">CARSA <span>seguros y fianzas</span></div>
          <button onClick={()=>{setStep(0);setR(null);}} style={{background:'transparent',border:'none',fontSize:13,color:'var(--text-muted)',cursor:'pointer',fontFamily:'inherit',textDecoration:'underline'}}>Empezar de nuevo</button>
        </div>

        <div className="R-hero">
          <p className="R-hi">Propuesta personal para</p>
          <h1 className="R-name">{nm}</h1>
        </div>

        <div className="R-main">
          <span className="R-main-tag">{hasProteccion?'✨ Tu futuro en dos caras':'✨ Tu futuro proyectado'}</span>
          <p className="R-main-h">
            A los <strong>{R.edadFinal} años</strong> podrás acumular <strong>{fm(last?.s||0)}</strong> para tu retiro.
            {hasProteccion&&<><br/><br/>Y desde <em>hoy</em>, tu familia cuenta con un respaldo de <strong>{fm(c.p)}</strong>.</>}
          </p>
          <div className="R-nums" style={hasProteccion?{}:{gridTemplateColumns:'1fr'}}>
            <div className="R-num">
              <div className="R-num-v">{fm(last?.s||0)}</div>
              <div className="R-num-l">Fondo a edad {R.edadFinal}</div>
            </div>
            {hasProteccion&&<div className="R-num">
              <div className="R-num-v">{fm(c.p)}</div>
              <div className="R-num-l">Protección familiar</div>
            </div>}
          </div>
          {R.edadFinal<60&&<div className="R-isr-note">
            <span className="R-isr-ico">⚠️</span>
            <span>Al terminar tu plan antes de los 60 años, este monto está <strong>sujeto a retención de ISR</strong> sobre los intereses generados según ley vigente.</span>
          </div>}
        </div>

        <div className="R-inv">
          <div className="R-inv-l">{hasProteccion?'Tu inversión mensual · año 1':'Tu aportación mensual · año 1'}</div>
          <div className="R-inv-v">{fm(Math.round(R.tot))}<small>/mes</small></div>
          <div className="R-inv-s">Con incremento anual del 4% por inflación</div>
          {hasProteccion&&<div className="R-split">
            <div className="R-sp Ahorro"><div className="R-sp-v">{fm(f.ap)}</div><div className="R-sp-l">Ahorro</div></div>
            <div className="R-sp Proteccion"><div className="R-sp-v">{fm(Math.round(R.bl))}</div><div className="R-sp-l">Protección</div></div>
          </div>}
        </div>

        {R.bonoPct>0&&<div className="R-bono">
          <div className="R-bono-ico">🎁</div>
          <h3 className="R-bono-t">Bono de Fidelidad · {Math.round(R.bonoPct*100)}%</h3>
          <p className="R-bono-d">Al cumplir tu plazo de {R.plAh} años, recibes un bono estimado de <strong>{fm(R.bonoFinal)}</strong> que ya está incluido en tu saldo proyectado.</p>
          <div className="R-bono-det">
            <div className="R-bono-it"><span>Porcentaje aplicable</span><strong>{Math.round(R.bonoPct*100)}% de tu prima anual</strong></div>
            <div className="R-bono-it"><span>Condición</span><strong>Cumplir aportaciones comprometidas</strong></div>
          </div>
        </div>}

        <div className="R-ch">
          <h3 className="R-ch-t">{hasProteccion?'Tu ahorro + blindaje a lo largo del tiempo':'Tu ahorro a lo largo del tiempo'}</h3>
          <p className="R-ch-s">Así crece tu patrimonio cada año</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={R.proj} margin={{top:8,right:14,left:0,bottom:4}}>
              <defs>
                <linearGradient id="gSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity={.4}/>
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity={.02}/>
                </linearGradient>
                <linearGradient id="gShield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A8A7D" stopOpacity={.28}/>
                  <stop offset="100%" stopColor="#1A8A7D" stopOpacity={.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 5" stroke="#E8DFCF"/>
              <XAxis dataKey="edad" tick={{fontSize:10,fill:'#7A8493'}} axisLine={{stroke:'#E8DFCF'}}/>
              <YAxis tickFormatter={v=>'$'+fmt(v/1000)+'K'} tick={{fontSize:10,fill:'#7A8493'}} width={60} axisLine={{stroke:'#E8DFCF'}}/>
              <Tooltip formatter={v=>fm(v)} labelFormatter={l=>`Edad ${l}`} contentStyle={{borderRadius:12,fontSize:12,border:'1px solid #E8DFCF',background:'#fff'}}/>
              <Legend verticalAlign="top" height={32} iconType="circle" wrapperStyle={{fontSize:11,paddingBottom:10}}/>
              {hasProteccion&&<Area type="monotone" dataKey="bl" stroke="#1A8A7D" fill="url(#gShield)" strokeWidth={2} name="Protección a tu familia"/>}
              <Area type="monotone" dataKey="s" stroke="#C9A84C" fill="url(#gSavings)" strokeWidth={2.5} name="Tu ahorro"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* EXTENDED PROJECTION - if user finishes plan before 65 */}
        {R.projExtended&&<div className="R-ext">
          <div className="R-ext-tag">💡 ¿Y si sigues ahorrando?</div>
          <h3 className="R-ext-h">Si continuaras hasta los <em>65 años</em></h3>
          <p className="R-ext-sub">
            Al terminar tu plan tendrás <strong>{R.edadFinal} años</strong>. Si decides seguir ahorrando <strong>{R.projExtended.anosExtra} años más</strong> hasta tu retiro, podrías acumular:
          </p>
          <div className="R-ext-amt">{fm(R.projExtended.saldo65)}</div>
          <p className="R-ext-foot">A los 65 años · {fm(R.projExtended.saldo65-(last?.s||0))} más que al término de tu plan</p>
        </div>}

        {/* PRIMARY CTA */}
        <div className="R-cta">
          <h2 className="R-cta-h">¿Te gusta lo que ves?</h2>
          <p className="R-cta-s">{hasProteccion?'Pide tu propuesta formal con ambas cotizaciones detalladas. Te las enviamos personalizadas en menos de 24 horas.':'Pide tu propuesta formal de ahorro y agendamos una asesoría sobre tus opciones de protección personalizadas.'}</p>
          <a className="CtaWa" href={waLink} target="_blank" rel="noopener">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Pedir mi propuesta por WhatsApp
          </a>
          <p style={{fontSize:11,color:'rgba(255,255,255,.75)',marginTop:14,fontStyle:'italic'}}>Un asesor especializado te atenderá personalmente</p>
        </div>

        {/* DETAILS TOGGLE */}
        <button className={`R-det-toggle ${showDetails?'open':''}`} onClick={()=>setShowDetails(!showDetails)}>
          {showDetails?'Ocultar detalles del plan':'Ver todos los detalles del plan'}
          <span className="arr">▼</span>
        </button>

        <button className="Pdf-btn" onClick={generarPDF} disabled={pdfLoading}>
          {pdfLoading?'⏳ Preparando...':'📄 Guardar / Imprimir propuesta'}
        </button>

        {showDetails&&<div className="R-det">
          <div className="R-pd">
            <h3 className="R-pd-t">📋 Datos de tu plan</h3>
            <div className="R-pd-g">
              <div className="R-pd-b"><div className="R-pd-n">{f.edad} años</div><div className="R-pd-l">Tu edad</div></div>
              <div className="R-pd-b"><div className="R-pd-n">{f.sx==='H'?'Hombre':'Mujer'}</div><div className="R-pd-l">{f.fu?'Fumador(a)':'No fumador'}</div></div>
              <div className="R-pd-b"><div className="R-pd-n">{R.plAh} años</div><div className="R-pd-l">Plazo ahorro</div></div>
              <div className="R-pd-b"><div className="R-pd-n">{R.rn}%</div><div className="R-pd-l">Rendimiento est.</div></div>
              {hasProteccion&&<div className="R-pd-b"><div className="R-pd-n">{pL[f.pl]}</div><div className="R-pd-l">Plazo protección</div></div>}
              <div className="R-pd-b" style={{background:f.isr==='151'?'rgba(26,138,125,.08)':'var(--cream)'}}><div className="R-pd-n" style={{fontSize:13}}>{f.isr==='151'?'Deducible':'Flexible'}</div><div className="R-pd-l">Tipo de plan</div></div>
            </div>
          </div>

          {hasProteccion&&<div className="R-bl">
            <h3 className="R-bl-t">🛡️ Tu protección incluye</h3>
            <p className="R-bl-s">Coberturas iniciales del paquete contratado</p>
            {[
              ['Protección familiar (fallecimiento)',fm(c.p),false],
              ['Continuidad financiera (invalidez)',fm(c.i),false],
              ['Solvencia ante salud crítica',fm(c.s),false],
              ['Anticipo últimos gastos','Hasta '+fm(c.u),false],
              ['Asistencia integral','✓ Incluida',true]
            ].map(([l,v,g],i)=>(
              <div key={i} className="R-bl-i">
                <div className="R-bl-r">
                  <span className="R-bl-lbl">{l}</span>
                  <span className={`R-bl-v ${g?'inc':''}`}>{v}</span>
                </div>
              </div>
            ))}
            <div className="R-bl-note">
              <span style={{fontSize:14,marginRight:6}}>ℹ️</span>
              La contratación del seguro de vida está sujeta a la <strong>suscripción del riesgo</strong> según las condiciones de salud que se declaren y evalúen.
            </div>
          </div>}

          <div className="R-tb">
            <h3 className="R-tb-t">📊 Proyección año a año</h3>
            <p className="R-tb-s">{f.isr==='151'?'Art. 151 · Deducible · '+(R.edadFinal>=65?'Exento hasta 90 UMAs; excedente retención 20%':'Retención 20% (retiro antes de 65)'):'Art. 93 · Flexible'+(R.edadFinal>=60?' · Exento ISR (60+ años)':' · Retención 20% si retiras antes de los 60')}</p>
            <div style={{overflowX:'auto'}}>
            <table className="Tbl"><thead><tr>
              <th>Año</th><th>Edad</th><th>Aportación</th>{hasProteccion&&<th>Protección</th>}<th>Saldo</th>{R.bonoPct>0&&<th>Bono</th>}<th>Si retiras</th>
            </tr></thead>
            <tbody>
            {R.proj.filter((_,i)=>{const l=R.proj.length;if(l<=15)return true;return i<3||i>=l-3||(i+1)%5===0;}).map((r,i,arr)=>{
              const gap=i>0&&r.y-arr[i-1].y>1;
              const isEnd=r.esFinalPlazo&&r.y===R.plAh;
              return(<React.Fragment key={r.y}>{gap&&<tr><td colSpan={hasProteccion?(R.bonoPct>0?8:7):(R.bonoPct>0?7:6)} className="Tbl-el">⋮</td></tr>}
                <tr className={isEnd?'hl':''}>
                  <td>{r.y}</td>
                  <td>{r.edad}{isEnd?' ★':''}</td>
                  <td style={{color:'var(--sage)'}}>{fm(r.apY)}</td>
                  {hasProteccion&&<td style={{color:'var(--text-muted)'}}>{fm(r.blY)}</td>}
                  <td style={{fontWeight:700,color:'var(--ink)'}}>{fm(r.s)}</td>
                  {R.bonoPct>0&&<td style={{color:'var(--gold)',fontSize:11}}>{fm(r.bono)}</td>}
                  <td style={{color:r.esFinalPlazo?'var(--sage)':'var(--earth)',fontWeight:r.esFinalPlazo?700:400}}>
                    {r.y<=1&&!r.esFinalPlazo?<span style={{fontSize:10,opacity:.5}}>—</span>:fm(r.dispNeto)}
                    {r.esFinalPlazo&&<span style={{fontSize:8,color:'var(--sage)',marginLeft:3}}>✓</span>}
                  </td>
                </tr></React.Fragment>);
            })}
            {R.proj65Rows&&R.proj65Rows.length>0&&<>
              <tr><td colSpan={hasProteccion?(R.bonoPct>0?8:7):(R.bonoPct>0?7:6)} className="Tbl-el" style={{paddingTop:8,paddingBottom:8}}>
                <span style={{fontSize:10,color:'var(--gold)',fontWeight:600,fontStyle:'italic'}}>▼ Si continúas hasta los 65 años</span>
              </td></tr>
              {R.proj65Rows.filter((_,i)=>{const l=R.proj65Rows.length;if(l<=5)return true;return i===0||i===l-1||(i+1)%5===0;}).map((r,i,arr)=>{
                const gap65=i>0&&r.y-arr[i-1].y>1;
                const is65=r.edad===65;
                return(<React.Fragment key={'e'+r.y}>{gap65&&<tr><td colSpan={hasProteccion?(R.bonoPct>0?8:7):(R.bonoPct>0?7:6)} className="Tbl-el">⋮</td></tr>}
                  <tr className={is65?'hl':''} style={{background:is65?'rgba(201,168,76,.08)':'rgba(201,168,76,.03)'}}>
                    <td>{r.y}</td>
                    <td style={{fontStyle:'italic'}}>{r.edad}{is65?' ★':''}</td>
                    <td style={{color:'var(--sage)'}}>{fm(r.apY)}</td>
                    {hasProteccion&&<td style={{color:'var(--text-muted)'}}>{fm(r.blY)}</td>}
                    <td style={{fontWeight:700,color:'var(--ink)'}}>{fm(r.s)}</td>
                    {R.bonoPct>0&&<td style={{color:'var(--gold)',fontSize:11}}>{fm(r.bono||0)}</td>}
                    <td style={{color:'var(--earth)',fontWeight:is65?700:400}}>{fm(r.dispNeto)}<span style={{fontSize:8,color:'var(--sage)',marginLeft:3}}>✓</span></td>
                  </tr></React.Fragment>);
              })}
            </>}
            </tbody></table>
            </div>
            <p style={{fontSize:10,color:'var(--text-muted)',marginTop:10,lineHeight:1.55,fontStyle:'italic',padding:'0 4px'}}>
              La columna "Si retiras" muestra el monto neto después de cargo por retiro anticipado (1% dentro del plazo) y retención de ISR
              {f.isr==='151'?(R.edadFinal>=65?' (exento hasta 90 UMAs anuales a los 65+; 20% sobre excedente).':' (20% sobre el total si el retiro es antes de los 65 años).')
              :((f.edad+R.plAh)>=60?' (exento al cumplir 60 años con plazo ≥ 5 años).':' (retención provisional 20% si retiras antes de los 60).')}
              {' '}Al cumplir el plazo (★) no aplica cargo por retiro y se acredita el Bono de Fidelidad.
            </p>
          </div>

          <div className="R-qt">
            <p className="R-qt-txt">
              {hasProteccion?<>
                Con <strong>{fm(Math.round(R.tot))}/mes</strong> proteges a tu familia con <strong>{fm(c.p)}</strong> si no llegas…<br/>
                Y te llevas <strong>{fm(last?.s||0)}</strong> si sí llegas.
              </>:<>
                Con <strong>{fm(f.ap)}/mes</strong> construyes un patrimonio de <strong>{fm(last?.s||0)}</strong> para tu retiro.<br/>
                {R.projExtended&&<>Y si sigues hasta los 65 años, podrías llegar a <strong>{fm(R.projExtended.saldo65)}</strong>.</>}
              </>}
            </p>
            <span className="R-qt-slogan">{hasProteccion?'Tu ahorro está blindado':'Tu futuro empieza hoy'}</span>
          </div>

          {/* Second CTA at end of details */}
          <div className="R-cta">
            <h2 className="R-cta-h">¿Listo para dar el siguiente paso?</h2>
            <p className="R-cta-s">{hasProteccion?'Solicita tu propuesta formal con el detalle completo de ambos productos.':'Solicita tu propuesta formal y agenda una asesoría personalizada.'}</p>
            <a className="CtaWa" href={waLink} target="_blank" rel="noopener">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Pedir mi propuesta por WhatsApp
            </a>
          </div>
        </div>}

        <div className="Ft">
          <div className="Ft-lg">CARSA <em>seguros y fianzas</em></div>
          <div className="Ft-tag">Consultores asociados en riesgos · Desde 1998</div>
          <a className="Ft-more" href="https://carsaseguros.mx" target="_blank" rel="noopener">Conoce más sobre CARSA →</a>
          <div className="Ft-sr">
            <a className="Ft-sl" href="https://www.facebook.com/carsasegurosyfianzas" target="_blank" rel="noopener">Facebook</a>
            <a className="Ft-sl" href="https://www.instagram.com/grupocarsa" target="_blank" rel="noopener">Instagram</a>
            <a className="Ft-sl" href="https://carsaseguros.mx" target="_blank" rel="noopener">carsaseguros.mx</a>
          </div>
          <p className="Ft-dis">
            Ilustración con fines orientativos. Rendimiento estimado según plazo, neto después de cargos del producto (~2% anual). Aportaciones con incremento del 4% anual por inflación. No garantiza resultados futuros.
            {' '}<strong>La contratación del seguro de vida (protección) está sujeta a la suscripción del riesgo según las condiciones de salud declaradas y evaluadas por Allianz México.</strong> Al solicitar tu propuesta formal, un asesor te guiará en el proceso de declaración de salud y suscripción.
            {' '}Producto: OptiMaxx Plus + OptiMaxx Protección (Paquete Master) de Allianz México.
          </p>
        </div>
      </div>
    </div>
  );
}



ReactDOM.render(React.createElement(App), document.getElementById('root'));
