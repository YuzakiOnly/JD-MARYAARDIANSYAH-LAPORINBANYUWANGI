<?php

namespace App\Providers\Filament;

use App\Http\Middleware\AdminMiddleware;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Filament\Navigation\NavigationBuilder;
use Filament\Navigation\NavigationItem;
use Filament\Navigation\NavigationGroup;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->colors([
                'primary' => Color::Blue,
            ])
            ->brandName('Laporin! Admin')

            ->sidebarCollapsibleOnDesktop()
            ->sidebarWidth('20rem')

            ->navigation(function (NavigationBuilder $builder): NavigationBuilder {
                return $builder
                    ->group('Dashboard', [
                        NavigationItem::make('Dashboard')
                            ->icon('heroicon-o-home')
                            ->url(fn() => route('filament.admin.pages.dashboard'))
                            ->isActiveWhen(fn() => request()->routeIs('filament.admin.pages.dashboard')),
                    ])
                    ->group('Master Data', [
                        NavigationItem::make('Kecamatan')
                            ->icon('heroicon-o-map-pin')
                            ->url(fn() => route('filament.admin.resources.kecamatans.index'))
                            ->isActiveWhen(fn() => request()->routeIs('filament.admin.resources.kecamatans.*')),
                        NavigationItem::make('Category')
                            ->icon('heroicon-o-tag')    
                            ->url(fn() => route('filament.admin.resources.categories.index'))
                            ->isActiveWhen(fn() => request()->routeIs('filament.admin.resources.categories.*')),
                    ])
                    ->group('Laporin', [
                        NavigationItem::make('Laporan')
                            ->icon('heroicon-o-document-text')
                            ->url(fn() => route('filament.admin.resources.laporans.index'))
                            ->isActiveWhen(fn() => request()->routeIs('filament.admin.resources.laporans.*')),
                    ])
                    ->group('Message', [
                        NavigationItem::make('Message')
                            ->icon('heroicon-o-chat-bubble-left-right')
                            ->url(fn() => route('filament.admin.resources.messages.index'))
                            ->isActiveWhen(fn() => request()->routeIs('filament.admin.resources.messages.*')),
                    ])
                    ->group('Auth Account', [
                        NavigationItem::make('User')
                            ->icon('heroicon-o-user')
                            ->url(fn() => route('filament.admin.resources.users.index'))
                            ->isActiveWhen(fn() => request()->routeIs('filament.admin.resources.users.*')),
                    ]);
            })

            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament/Widgets')
            ->widgets([
                AccountWidget::class,
            ])

            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
                AdminMiddleware::class,
            ])
            ->authGuard('web');
    }
}